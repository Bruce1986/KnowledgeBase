# SaaS 架構設計：GCP 架構圖與元件說明（履歷評分系統）

## 🔧 架構目標
打造一套可支援多租戶企業用戶的 SaaS 架構，提供履歷分析與評分服務，部署於 Google Cloud Platform，前端採 Vue.js，後端採容器化服務，資料與檔案儲存皆雲端化設計。

---

## 🗺️ 架構圖版本
> 圖檔名稱：`gcp_saas_resume_architecture.png`  
> 圖檔位置：`/mnt/data/A_2D_digital_diagram_illustrates_a_Google_Cloud_Pl.png`

### 架構階段分層

#### v1 MVP（最小可用產品）
- Vue.js 前端部署於 Firebase Hosting 或 GCS + CDN
- API Gateway 管理流量與認證
- Cloud Run 部署後端履歷評分服務（FastAPI / Flask）
- Cloud SQL（PostgreSQL）儲存企業設定與分析資料
- Cloud Storage 儲存履歷檔案與分析結果

#### v2 成長期（功能擴充）
- 多個後端模組服務（帳戶、設定、分析）
- Pub/Sub 做為異步任務佇列（例如履歷批次評分）
- Cloud Scheduler 排程任務（定期分析、報表寄送）
- SendGrid 寄送通知或結果信件
- Cloud Memorystore 提供 Redis 快取

---

## 📦 關鍵服務模組說明

| 模組名稱 | 服務對應 | 說明 |
|----------|-----------|------|
| 前端部署 | Firebase Hosting / Cloud Storage | Vue.js 前端靜態資源，支援 CDN |
| API 管理 | API Gateway / Cloud Endpoints | 管理 API 流量與權限驗證 |
| 後端服務 | Cloud Run | 容器化的履歷評分邏輯與帳號設定模組 |
| 資料庫 | Cloud SQL (PostgreSQL) | 儲存企業資料、設定、使用紀錄 |
| 檔案儲存 | Cloud Storage | 履歷原始檔、分析報告 JSON、報表備份 |
| 快取與 session | Cloud Memorystore | Redis 用於加速查詢與 session 儲存 |
| 任務佇列 | Pub/Sub | 處理非同步任務，例如大批履歷評分 |
| 定時任務 | Cloud Scheduler + Tasks | 寄送報表、過期通知、每日分析等排程 |
| 通知系統 | SendGrid / Mailgun | 自動寄送系統信件（通知、驗證、報表） |

---

## 📋 推薦架構演進路線

1. **MVP 階段**
   - 快速驗證市場需求
   - 單租戶架構即可
   - Firebase + Cloud Run + Cloud SQL

2. **成長階段**
   - 引入多租戶管理邏輯
   - 加入 Pub/Sub 與 Cloud Scheduler
   - 建立帳務模組與使用者分級

3. **成熟階段**
   - 模組化服務（微服務）
   - RBAC 權限控管
   - 使用統計與 ML 分析強化引擎

---

## 🏷️ Tags

`#GCP架構圖` `#SaaS建設` `#履歷評分系統` `#CloudRun` `#CloudSQL` `#PubSub` `#VueJS`
