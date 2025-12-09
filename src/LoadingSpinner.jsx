export default function LoadingSpinner() {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <div
        style={{
          display: "inline-block",
          width: "32px",
          height: "32px",
          border: "3px solid #999",
          borderTopColor: "#0078ff",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <p style={{ marginTop: "8px", color: "#ccc" }}>Loading...</p>
    </div>
  );
}
