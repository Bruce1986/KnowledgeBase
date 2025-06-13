
# 在 Mac 上擷取桌面範圍並使用 YOLO 即時辨識物件

## 一、目標
在 Mac（或 Windows）上透過 Python 擷取桌面指定區域的畫面，並利用 YOLOv8 進行即時物件辨識。

---

## 二、使用工具

| 工具 / 套件 | 功能 |
|-------------|------|
| `mss`       | 螢幕畫面擷取 |
| `OpenCV`    | 圖像處理與視覺化 |
| `ultralytics` | YOLOv8 模型套件 |
| `torch`     | 深度學習運算框架 |
| `numpy`     | 矩陣處理 |

---

## 三、環境安裝

```bash
pip install opencv-python numpy torch torchvision ultralytics mss
```

---

## 四、Python 程式碼

```python
import cv2
import torch
import numpy as np
import mss
from ultralytics import YOLO

# 初始化 YOLOv8 模型（Nano 版）
model = YOLO("yolov8n.pt")

# 設定螢幕擷取區域（top, left, width, height）
monitor = {"top": 200, "left": 300, "width": 640, "height": 480}

# 螢幕擷取與辨識迴圈
with mss.mss() as sct:
    while True:
        screenshot = sct.grab(monitor)
        frame = np.array(screenshot)
        frame = cv2.cvtColor(frame, cv2.COLOR_BGRA2BGR)

        results = model(frame)

        # 顯示辨識結果
        for result in results:
            for box in result.boxes:
                x1, y1, x2, y2 = map(int, box.xyxy[0])
                conf = box.conf[0].item()
                cls = int(box.cls[0])
                label = f"{model.names[cls]} {conf:.2f}"

                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                cv2.putText(frame, label, (x1, y1 - 10),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

        cv2.imshow("Screen Capture with YOLO", frame)

        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

cv2.destroyAllWindows()
```

---

## 五、進階設定

### 1. 擷取整個螢幕
```python
monitor = sct.monitors[1]
```

### 2. GPU 加速
```python
device = "cuda" if torch.cuda.is_available() else "mps" if torch.backends.mps.is_available() else "cpu"
model = YOLO("yolov8n.pt").to(device)
results = model(frame, device=device)
```

### 3. 模型選擇
| 模型        | 說明               |
|-------------|--------------------|
| `yolov8n.pt` | Nano，最快速度 |
| `yolov8s.pt` | 小型模型，準確與效能平衡 |
| `yolov8m.pt` | 中型模型，準確度提升 |
| `yolov8l.pt` | 大型模型，高精度 |
| `yolov8x.pt` | 特大模型，最準確但慢 |

---

## 六、應用場景
- 即時監控交易軟體、遊戲畫面、介面元素
- 利用 YOLO 模型即時辨識畫面中物體
- 視覺化展示 YOLO 推論結果

---

## 七、結束操作
- 按下 `q` 鍵即可結束執行程式並關閉視窗。

---

## 八、備註
- 若在 Apple Silicon（M1 / M2）機器上使用，可嘗試 `mps` 模式進行加速。
- 若需全螢幕擷取或支援多螢幕，`mss.monitors[i]` 可以列出所有螢幕座標資訊。
