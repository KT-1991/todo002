import type { DbId, PromiserMethods } from '@sqlite.org/sqlite-wasm'
import { sqlite3Worker1Promiser } from '@sqlite.org/sqlite-wasm'
import { ref } from 'vue'

const databaseConfig = {
  filename: 'file:mydb.sqlite3?vfs=opfs',
  tables: {
    test: {
      name: 'test_table',
      schema: `
        CREATE TABLE IF NOT EXISTS ms_category (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS tr_todo (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          id_category INTEGER,
          title TEXT NOT NULL,
          detail TEXT,
          do_at TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS d_ms_category (
          id INTEGER PRIMARY KEY,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS d_tr_todo (
          id INTEGER PRIMARY KEY,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `,
    },
  },
} as const

const _databaseConfig = {
  filename: 'file:mydb.sqlite3?vfs=opfs',
  tables: {
    test: {
      name: 'test_table',
      schema: `
        CREATE TABLE IF NOT EXISTS test_table (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `,
    },
  },
} as const

export function useSQLite() {
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
  const isInitialized = ref(false)

  let promiser: ReturnType<typeof sqlite3Worker1Promiser> | null = null
  let dbId: string | null = null

  async function initialize() {
    if (isInitialized.value) return true

    isLoading.value = true
    error.value = null

    try {
      // Initialize the SQLite worker
      promiser = await new Promise((resolve) => {
        const _promiser = sqlite3Worker1Promiser({
          onready: () => resolve(_promiser),
        })
      })

      if (!promiser) throw new Error('Failed to initialize promiser')

      // Get configuration and open database
      await promiser('config-get', {})
      const openResponse = await promiser('open', {
        filename: databaseConfig.filename,
      })

      if (openResponse.type === 'error') {
        throw new Error(openResponse.result.message)
      }

      dbId = openResponse.result.dbId as string

      // Create initial tables
      await promiser('exec', {
        dbId,
        sql: databaseConfig.tables.test.schema,
      })

      isInitialized.value = true
      return true
    }
    catch (err) {
      error.value = err instanceof Error ? err : new Error('Unknown error')
      throw error.value
    }
    finally {
      isLoading.value = false
    }
  }

  async function executeQuery(sql: string, params: unknown[] = []) {
    if (!dbId || !promiser) {
      await initialize()
    }

    isLoading.value = true
    error.value = null

    try {
      const result = await promiser!('exec', {
        dbId: dbId as DbId,
        sql,
        bind: params,
        returnValue: 'resultRows',
      })

      if (result.type === 'error') {
        throw new Error(result.result.message)
      }

      return result
    }
    catch (err) {
      error.value = err instanceof Error ? err : new Error('Query execution failed')
      throw error.value
    }
    finally {
      isLoading.value = false
    }
  }

  function exportDB() {
    // ダウンロード時のファイル名
    const filename = 'sample.sqlite3'

    // Promiser経由でSQLiteのデータを取得
    promiser!('export' as keyof PromiserMethods, {
        dbId: dbId as never
    }).then((response) => {
        // 実行結果からBlobを生
        const blob = new Blob([(response.result as any).byteArray], {
            type: 'application/x-sqlite3'
        })

        // アンカータグを使ってファイルをダウンロード
        const a = document.createElement('a')
        a.href = URL.createObjectURL(blob)
        a.download = filename
        document.body.appendChild(a)

        // ダウンロード後の処理(後片付け)を設定
        a.addEventListener('click', () => {
            // 0.5秒後に設定
            setTimeout(() => {
                URL.revokeObjectURL(a.href)
                a.remove()
            }, 500)
        })

        // ファイルダウンロード処理をブラウザに任せる
        a.click()
    })

  }
  async function importDB(){
    // ファイルからデータ読み込み実行
    const showOpenFileDialog = () => new Promise(resolve => {
	    const input = document.createElement('input');
      input.type = 'file';
      //input.accept = 'text/plain';
      input.onchange = () => { resolve(input.files); };
      input.click();
    });
    const files: any = await showOpenFileDialog();

    let blob: Blob = await files[0];
    const arrayBuffer = await blob.arrayBuffer();
    console.log("inport")
    // file: File ファイル選択ダイアログで選択されたファイル

    // OPFSのルートディレクトリの取得
    const root = await navigator.storage.getDirectory()

    // SQLiteのDBファイルのハンドル取得
    const sqliteFileHandle = await root.getFileHandle(
            'mydb.sqlite3', {
                create: true
            }
    )

    // ファイルの書き込み用ハンドルを取得して読み込んだデータを上書きする
    const accessHandle = await sqliteFileHandle.createWritable()
    await accessHandle.write(blob)
    await accessHandle.close()

    // promiserで再度DBを開きなおす
    promiser!('open', {
      filename: databaseConfig.filename
    }).then((response) => {
      // 開きなおしたら変数で保持していたdbIdを更新する
      dbId = response.dbId as string
    })
  }

  return {
    isLoading,
    error,
    isInitialized,
    executeQuery,
    exportDB,
    importDB,
  }
}