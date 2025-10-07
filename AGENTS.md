- 盡量遵從 gemini-code-assist 的 review 建議。
# AGENTS - Contribution Guidelines

- 在撰寫新的 function 時，請盡量撰寫對應的 unit test，確保程式碼正確性與可維護性。

## 目錄規劃

當我們開始將語言模型（LLM）視為團隊成員或核心系統時，如何「餵養」它高品質、有組織的資訊，就直接決定了它的輸出品質與可靠性。您這個問題，本質上是在探討如何為 AI 建立一個清晰、可信的「外部記憶體」或「第二大腦」。
讓我們運用首原則（First Principles）來拆解這個問題。語言模型的核心能力是理解和生成文本。因此，我們的目標是建構一個系統，讓模型（或驅動模型的系統，如 RAG）能夠以最高效率、最低模糊性的方式檢索到最相關的文本片段。
基於這個核心原則，一個理想的資料儲存庫（Repository）架構應該具備以下特質：可檢索性 (Retrievable)、原子性 (Atomic)、上下文清晰 (Contextualized)、一致性 (Consistent) 與可維護性 (Maintainable)。
底下我將為您擘劃一個兼具理論與實踐的架構，並說明其背後的思考邏輯。
推薦架構：一個為 AI 優化的知識庫
這是一個推薦的目錄結構，您可以將其視為一個起點，再根據您的具體需求進行調整。
.
├── 📁 data/                      # 知識庫的核心內容
│   ├── 📁 01_products/           # 主題一：產品資訊
│   │   ├── a_product_specs.md
│   │   ├── b_product_pricing.md
│   │   └── _index.md             # 該主題的摘要與導覽
│   ├── 📁 02_protocols/          # 主題二：內部協議
│   │   ├── api_guidelines.md
│   │   ├── security_procedures.md
│   │   └── _index.md
│   ├── 📁 03_best_practices/     # 主題三：最佳實踐
│   │   ├── code_review_standards.md
│   │   ├── project_management_flow.md
│   │   └── _index.md
│   └── 📁 assets/                 # 圖片、附件等非文本資源
│       └── product_a_architecture.png
│
├── 📁 templates/                # 知識文件的標準模板
│   └── standard_document_template.md
│
├── 📁 scripts/                  # 自動化腳本
│   └── generate_index.py         # 例如：自動生成 README 的目錄
│
├── 📄 README.md                  # 整個知識庫的入口與總目錄
├── 📄 CONTRIBUTING.md           # 如何貢獻與維護此知識庫的指南
├── 📄 CHANGELOG.md              # 重大變更的日誌
└── 📄 .gitignore                # Git 忽略檔案配置

## 核心設計理念與細節詳解
1. README.md：知識庫的智慧大門
這是整個 Repository 最關鍵的檔案，也是您問題的核心。
是的，您絕對應該把檔案目錄結構放在 README.md 裡，但它不該只是一個呆板的檔案列表。請將 README.md 當作是一個為 AI 設計的「總索引」與「使用手冊」。
它應該包含：
 * 🎯 知識庫的目標 (Purpose): 開宗明義地告訴模型：「這個資料庫是關於 [公司名] 的 [產品/技術/內部流程] 資訊，最後更新於 [日期]。所有資訊應以此處為準。」這給了模型一個最頂層的上下文。
 * 🗺️ 結構化目錄 (Structured Table of Contents): 這就是您提到的檔案目錄。但不要只列出檔名，要加上簡短的描述。這能幫助模型在檢索時快速判斷哪個主題分類最相關。
   * 範例：
     ## 知識庫導覽

- **[產品資訊 (`/data/01_products/`)](./data/01_products/_index.md)**
  - 包含所有產品的規格、定價、技術架構與常見問答。
- **[內部協議 (`/data/02_protocols/`)](./data/02_protocols/_index.md)**
  - 開發團隊必須遵守的 API 設計指南、資安規範與緊急應變流程。
- **[最佳實踐 (`/data/03_best_practices/`)](./data/03_best_practices/_index.md)**
  - 涵蓋程式碼審查標準、專案管理流程等，旨在提升團隊效率與品質。

 * 🔍 如何查詢 (How to Query): 您可以給予模型一些指導，例如：「當被問及產品規格時，請優先查找 /data/01_products/ 目錄下的文件。」
2. data/ 目錄：知識的原子化儲存
這是知識庫的主體。設計上的核心是「原子性」與「模組化」。
 * 主題式子目錄: 將知識按主題（如 products, protocols）分門別類。加上數字前綴（01_, 02_）可以固定排序，讓結構更穩定。
 * 原子化文件: 每一個 .md 檔案應該只專注於一個清晰、獨立的主題。例如，不要把產品規格、定價、API 全寫在一個巨大的檔案裡。將它們拆分成 product_a_specs.md 和 product_a_pricing.md。
   * 為什麼？ 這對 RAG (Retrieval-Augmented Generation) 系統至關重要。當使用者問關於「定價」的問題時，系統可以精準地抓取到 pricing.md 這個小而美的「知識塊」，而不是在一個充滿無關資訊的大檔案中大海撈針。這能大幅提升檢索的準確性。
 * _index.md 索引檔案: 每個主題目錄下都有一個 _index.md。它的作用是提供該主題的摘要和內部導覽，如同每一章的開頭導讀。
3. templates/ 目錄：確保一致性的基石
語言模型喜歡模式和結構。提供一個文件模板可以強制所有貢獻者遵循相同的格式。
 * `standard_document_template.md` 內容可能包含：
  ```markdown
  ---
  title: "[請填寫標題]"
  tags: [tag1, tag2]
  author: "[作者]"
  last_updated: "YYYY-MM-DD"
  version: "1.0"
  ---

  ## 摘要 (Summary)
  ...

  ## 詳細內容 (Details)
  ...

  ## 相關文件 (Related Documents)
  - [另一份文件](./path/to/another.md)

## 其他關鍵注意事項與進階策略
A. 善用 Metadata (YAML Frontmatter)
如上述模板所示，在每個 Markdown 文件的最頂端使用 YAML Frontmatter 格式加入元數據。這對 AI 來說是黃金！
 * title: 明確的標題。
 * tags: 關鍵字標籤，極大地增強了檢索能力。模型可以根據標籤找到關聯性高的文件。
 * last_updated: 模型可以知道這份資訊的「新鮮度」，甚至可以回答「根據 5 月份的最新資料...」。
 * version: 對於會頻繁變更的規格文件，版本號至關重要。
B. 連結而非複製 (Linking over Duplication)
當一份文件需要參考另一份文件的內容時，務必使用相對路徑的 Markdown 連結 ([連結文字](./path/to/file.md))，而不是複製貼上內容。
 * 好處: 維持了資訊的「單一事實來源 (Single Source of Truth)」。當原始文件更新時，所有引用它的地方都會自動連結到最新的版本。這避免了資訊過時和不一致的問題。
C. 自動化是您的好朋友
當知識庫變大時，手動維護 README.md 的目錄會變得很痛苦。
 * 建立腳本 (scripts/generate_index.py): 寫一個簡單的 Python 腳本來掃描 data/ 目錄，並自動生成 README.md 中的結構化目錄。這樣每次有新文件加入時，只要執行一次腳本，總目錄就更新了。這確保了目錄永遠是最新的。
D. Chunking 策略思維
雖然您已經將文件原子化，但有時單一文件仍然很長。在腦中要有一個「Chunking (分塊)」的概念。可以利用 Markdown 的標題（##, ###）來自然地將文件內容切分成有意義的段落。許多 RAG 系統會利用這些標題來做為切割知識的邊界。
E. 貢獻指南 (CONTRIBUTING.md)
這份文件是寫給人類看的。明確指示團隊成員如何新增、修改、刪除知識庫中的文件，包括：
 * 檔案命名規則。
 * 必須使用 templates/ 中的模板。
 * 更新文件後，需要執行的步驟（例如，執行索引生成腳本）。
總結
設計一個給語言模型用的資料庫，就像是為一位超級聰明但沒有長期記憶的實習生建立一套工作流程和參考手冊。
 * README.md 是總目錄兼操作手冊，讓它知道有什麼、在哪裡。
 * data/ 目錄是分門別類的檔案櫃，每份文件都是一個清晰的指示。
 * Metadata (YAML) 是貼在每份文件上的便利貼，提供了快速瀏覽的上下文。
 * 連結是文件之間溝通的橋樑，確保資訊同步。
 * 自動化是確保這套系統能長久運行的秘書。
這個架構不僅能讓語言模型發揮最大效用，同時也讓人類團隊成員能輕鬆地協作與維護。這是一個將知識「工程化」的過程，絕對是未來駕馭 AI 的核心技能之一。希望這套藍圖對您有幫助！

