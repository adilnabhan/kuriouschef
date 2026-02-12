import React from "react";
import { jsPDF } from "jspdf";

const RecipeDetailModal = ({ recipe, isOpen, onClose }) => {
  if (!isOpen || !recipe) return null;

  const generatePDF = (recipe) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(recipe.title || "Recipe", 10, 15);

    doc.setFontSize(12);
    doc.text("Ingredients:", 10, 30);
    doc.text(doc.splitTextToSize(recipe.ingredients || "N/A", 180), 10, 40);

    let y = 40 + doc.splitTextToSize(recipe.ingredients || "N/A", 180).length * 7;

    doc.text("Instructions:", 10, y + 10);
    doc.text(
      doc.splitTextToSize(recipe.instructions || "N/A", 180),
      10,
      y + 20
    );

    doc.save(`${recipe.title || "recipe"}.pdf`);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#1e1e1e",
          borderRadius: "12px",
          padding: "25px",
          maxWidth: "800px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            border: "none",
            background: "#B71C1C",
            color: "white",
            borderRadius: "50%",
            width: "35px",
            height: "35px",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          ×
        </button>

        <h2 style={{ color: "#FFD700" }}>{recipe.title}</h2>

        {/* Ingredients */}
        <h3 style={{ color: "#4CAF50" }}>Ingredients</h3>
        <pre style={{ whiteSpace: "pre-wrap", color: "#ccc" }}>
          {recipe.ingredients || "No ingredients"}
        </pre>

        {/* Instructions */}
        <h3 style={{ color: "#4CAF50" }}>Instructions</h3>
        <pre style={{ whiteSpace: "pre-wrap", color: "#ccc" }}>
          {recipe.instructions || "No instructions"}
        </pre>

        {/* Footer Buttons */}
        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <button
            onClick={() => generatePDF(recipe)}
            style={{
              flex: 1,
              background: "#4CAF50",
              color: "white",
              padding: "10px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            📥 Download PDF
          </button>

          <button
            onClick={() => {
              navigator.clipboard.writeText(
                `${recipe.title}\n\nIngredients:\n${recipe.ingredients}\n\nInstructions:\n${recipe.instructions}`
              );
              alert("Copied to clipboard!");
            }}
            style={{
              flex: 1,
              background: "#2196F3",
              color: "white",
              padding: "10px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            📋 Copy Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailModal;
