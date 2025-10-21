import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import metrics from "../../models/threadClassifier/1.0.0/metrics.json";

export default function TrainView() {
  const [status, setStatus] = useState<string | null>(null);
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) {
      return;
    }
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(chartRef.current, {
      type: "line",
      data: {
        labels: ["Train", "Validation"],
        datasets: [
          {
            label: "Accuracy",
            data: [metrics.accuracy, metrics.val_accuracy],
            borderColor: "#38bdf8"
          },
          {
            label: "Loss",
            data: [metrics.loss, metrics.val_loss],
            borderColor: "#f97316"
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: "#f8fafc"
            }
          }
        },
        scales: {
          x: {
            ticks: { color: "#cbd5f5" },
            grid: { color: "rgba(148, 163, 184, 0.2)" }
          },
          y: {
            ticks: { color: "#cbd5f5" },
            grid: { color: "rgba(148, 163, 184, 0.2)" }
          }
        }
      }
    });

    return () => {
      chartInstance.current?.destroy();
      chartInstance.current = null;
    };
  }, []);

  const handleTrain = async () => {
    setStatus("Training started...");
    setTimeout(() => {
      setStatus("Training completed. Review new run artifacts.");
    }, 800);
  };

  return (
    <div className="card">
      <h2>Training</h2>
      <p>Use the CLI command <code>npm run train</code> to generate new runs.</p>
      <button onClick={handleTrain}>Simulate Trigger</button>
      {status && <p>{status}</p>}
      <canvas ref={chartRef} height={240}></canvas>
    </div>
  );
}
