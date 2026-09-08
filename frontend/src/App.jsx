import { useRef, useState } from "react";
import "./App.css";

const API_URL = "http://127.0.0.1:8000";

/* =========================================================
   BREED INFORMATION DATABASE
   ========================================================= */

const BREED_INFO = {
  Alambadi: {
    type: "Draught",
    origin: "Tamil Nadu, India",
    climate: "Hot and dry regions",
    milk: "Low to moderate",
    traits: "Hardy, strong and well adapted to difficult conditions",
    uses: "Agricultural work and breeding",
    description:
      "Alambadi is an indigenous cattle breed from Tamil Nadu, traditionally valued for its strength, hardiness and ability to work in challenging environments.",
  },

  Amritmahal: {
    type: "Draught",
    origin: "Karnataka, India",
    climate: "Hot and dry regions",
    milk: "Low",
    traits: "Strong, active and excellent working ability",
    uses: "Draught work and agriculture",
    description:
      "Amritmahal cattle are a traditional Karnataka breed known for their strength, endurance and suitability for agricultural and transport work.",
  },

  Ayrshire: {
    type: "Dairy",
    origin: "Scotland",
    climate: "Cool to moderate",
    milk: "High",
    traits: "Good milk quality, active and adaptable",
    uses: "Commercial dairy farming",
    description:
      "Ayrshire is a dairy breed originating in Scotland. It is valued for efficient milk production and adaptability to different dairy systems.",
  },

  Banni: {
    type: "Dairy / Draught",
    origin: "Kutch, Gujarat, India",
    climate: "Hot and arid",
    milk: "Moderate to high",
    traits: "Excellent heat and drought tolerance",
    uses: "Milk production and rural farming",
    description:
      "Banni cattle are indigenous to the Kutch region of Gujarat and are particularly well adapted to hot, dry and semi-arid environments.",
  },

  Bargur: {
    type: "Draught",
    origin: "Tamil Nadu, India",
    climate: "Hilly and dry regions",
    milk: "Low",
    traits: "Strong, agile and disease resistant",
    uses: "Draught work",
    description:
      "Bargur cattle are a hardy indigenous breed from the Bargur hills of Tamil Nadu, traditionally used for agricultural work.",
  },

  Bhadawari: {
    type: "Dairy",
    origin: "Uttar Pradesh / Madhya Pradesh, India",
    climate: "Hot and semi-arid",
    milk: "Moderate",
    traits: "Heat tolerant and known for high-fat milk",
    uses: "Milk production",
    description:
      "Bhadawari is an indigenous cattle breed known particularly for milk with relatively high fat content and adaptation to hot environments.",
  },

  Brown_Swiss: {
    type: "Dairy",
    origin: "Switzerland",
    climate: "Cool to moderate",
    milk: "High",
    traits: "Hardy, calm and efficient milk producer",
    uses: "Commercial dairy farming",
    description:
      "Brown Swiss is a major dairy breed originating in Switzerland. It is recognized for longevity, strength and consistent milk production.",
  },

  Dangi: {
    type: "Draught",
    origin: "Maharashtra / Gujarat, India",
    climate: "Hot and humid",
    milk: "Low",
    traits: "Hardy and highly adapted to heavy rainfall",
    uses: "Agricultural work",
    description:
      "Dangi cattle are known for their ability to work in difficult terrain and tolerate the hot and humid conditions of parts of western India.",
  },

  Deoni: {
    type: "Dual purpose",
    origin: "Maharashtra, India",
    climate: "Semi-arid",
    milk: "Moderate",
    traits: "Hardy, calm and versatile",
    uses: "Milk and draught work",
    description:
      "Deoni is a dual-purpose indigenous breed from Maharashtra, valued for both milk production and agricultural work.",
  },

  Gir: {
    type: "Dairy",
    origin: "Gujarat, India",
    climate: "Hot and tropical",
    milk: "High",
    traits: "Heat tolerant, hardy and disease resistant",
    uses: "Milk production and breeding",
    description:
      "Gir is one of India's well-known indigenous dairy breeds. It is highly valued for its adaptability to hot climates and its milk production.",
  },

  Guernsey: {
    type: "Dairy",
    origin: "Guernsey, Channel Islands",
    climate: "Cool to moderate",
    milk: "High",
    traits: "Rich milk and efficient grazing ability",
    uses: "Dairy farming",
    description:
      "Guernsey cattle are a dairy breed known for producing milk with relatively high butterfat and protein content.",
  },

  Hallikar: {
    type: "Draught",
    origin: "Karnataka, India",
    climate: "Hot and dry",
    milk: "Low",
    traits: "Excellent endurance and strength",
    uses: "Draught work",
    description:
      "Hallikar is a famous indigenous draught breed from Karnataka, traditionally selected for endurance, strength and agricultural work.",
  },

  Hariana: {
    type: "Dual purpose",
    origin: "Haryana, India",
    climate: "Hot and semi-arid",
    milk: "Moderate",
    traits: "Hardy and adaptable",
    uses: "Milk and agricultural work",
    description:
      "Hariana cattle are an important north Indian breed used for both milk production and draught purposes.",
  },

  Holstein_Friesian: {
    type: "Dairy",
    origin: "Netherlands / Northern Europe",
    climate: "Cool to moderate",
    milk: "Very high",
    traits: "Very high milk production",
    uses: "Commercial dairy farming",
    description:
      "Holstein Friesian cattle are among the world's most widely used dairy cattle, particularly known for high milk production.",
  },

  Jaffrabadi: {
    type: "Buffalo",
    origin: "Gujarat, India",
    climate: "Hot and semi-arid",
    milk: "High",
    traits: "Large body, strong and high milk potential",
    uses: "Milk production",
    description:
      "Jaffrabadi is a large Indian buffalo breed from Gujarat, valued for its size, strength and milk production.",
  },

  Jersey: {
    type: "Dairy",
    origin: "Jersey, Channel Islands",
    climate: "Moderate",
    milk: "High",
    traits: "Efficient feed conversion and rich milk",
    uses: "Dairy farming",
    description:
      "Jersey cattle are a popular dairy breed known for producing milk with high butterfat content while requiring relatively less feed.",
  },

  Kangayam: {
    type: "Draught",
    origin: "Tamil Nadu, India",
    climate: "Hot and dry",
    milk: "Low",
    traits: "Strong, hardy and drought tolerant",
    uses: "Draught work",
    description:
      "Kangayam is a well-known Tamil Nadu draught breed recognized for strength, endurance and adaptation to dry conditions.",
  },

  Kankrej: {
    type: "Dual purpose",
    origin: "Gujarat / Rajasthan, India",
    climate: "Hot and dry",
    milk: "Moderate",
    traits: "Strong, hardy and heat tolerant",
    uses: "Milk and draught work",
    description:
      "Kankrej cattle are an important indigenous breed of western India, valued for both milk production and strong draught ability.",
  },

  Kasargod: {
    type: "Dairy / Dual purpose",
    origin: "Kerala, India",
    climate: "Hot and humid",
    milk: "Moderate",
    traits: "Small, hardy and climate adapted",
    uses: "Smallholder dairy farming",
    description:
      "Kasargod cattle are associated with Kerala and are valued for their adaptation to local tropical conditions and low-input farming systems.",
  },

  Kenkatha: {
    type: "Draught",
    origin: "Uttar Pradesh / Madhya Pradesh, India",
    climate: "Hot and dry",
    milk: "Low",
    traits: "Hardy and suitable for agricultural work",
    uses: "Draught work",
    description:
      "Kenkatha is an indigenous cattle breed adapted to parts of central and northern India and traditionally used for agricultural work.",
  },

  Kherigarh: {
    type: "Draught",
    origin: "Uttar Pradesh, India",
    climate: "Hot and dry",
    milk: "Low",
    traits: "Hardy and economical to maintain",
    uses: "Draught work",
    description:
      "Kherigarh cattle are a hardy indigenous breed from Uttar Pradesh, traditionally used for farm work and adapted to local conditions.",
  },

  Khillari: {
    type: "Draught",
    origin: "Maharashtra / Karnataka, India",
    climate: "Hot and dry",
    milk: "Low",
    traits: "Fast, strong and highly enduring",
    uses: "Draught work",
    description:
      "Khillari cattle are renowned draught animals of western India, especially valued for speed, endurance and strength.",
  },

  Krishna_Valley: {
    type: "Dual purpose",
    origin: "Karnataka / Maharashtra, India",
    climate: "Hot and semi-arid",
    milk: "Moderate",
    traits: "Large, strong and adaptable",
    uses: "Milk and draught work",
    description:
      "Krishna Valley cattle are a large indigenous breed developed in the Krishna River valley and used for both milk and agricultural work.",
  },

  Malnad_gidda: {
    type: "Dairy / Draught",
    origin: "Karnataka, India",
    climate: "Hilly and humid",
    milk: "Low to moderate",
    traits: "Small, hardy and highly adaptable",
    uses: "Smallholder farming",
    description:
      "Malnad Gidda is a small indigenous cattle breed from the hilly Malnad region of Karnataka, well adapted to humid and rugged environments.",
  },

  Mehsana: {
    type: "Buffalo",
    origin: "Gujarat, India",
    climate: "Hot and semi-arid",
    milk: "High",
    traits: "Good milk production and adaptability",
    uses: "Dairy farming",
    description:
      "Mehsana is an important Indian buffalo breed from Gujarat, widely valued for dairy production and adaptability.",
  },

  Murrah: {
    type: "Buffalo",
    origin: "Haryana / Punjab, India",
    climate: "Hot and semi-arid",
    milk: "Very high",
    traits: "Excellent dairy ability and high milk fat",
    uses: "Commercial dairy farming",
    description:
      "Murrah is one of the world's most important dairy buffalo breeds. It is highly valued for milk production and has influenced buffalo breeding programs globally.",
  },

  Nagori: {
    type: "Draught",
    origin: "Rajasthan, India",
    climate: "Hot and arid",
    milk: "Low",
    traits: "Fast, strong and drought tolerant",
    uses: "Draught and transport work",
    description:
      "Nagori cattle are a traditional Rajasthan breed valued for their speed, strength and ability to perform work in arid conditions.",
  },

  Nagpuri: {
    type: "Buffalo",
    origin: "Maharashtra, India",
    climate: "Hot and dry",
    milk: "Moderate",
    traits: "Hardy and heat tolerant",
    uses: "Milk production and farming",
    description:
      "Nagpuri buffalo are an indigenous buffalo breed adapted to the hot and relatively dry conditions of central India.",
  },

  Nili_Ravi: {
    type: "Buffalo",
    origin: "Punjab region",
    climate: "Hot and semi-arid",
    milk: "High",
    traits: "Good dairy ability and high-quality milk",
    uses: "Milk production",
    description:
      "Nili-Ravi is a prominent dairy buffalo breed known for good milk production and adaptation to the Punjab region.",
  },

  Nimari: {
    type: "Dual purpose",
    origin: "Madhya Pradesh, India",
    climate: "Hot and dry",
    milk: "Moderate",
    traits: "Hardy and useful for farm work",
    uses: "Milk and draught work",
    description:
      "Nimari cattle are an indigenous breed from central India, valued for their hardiness and dual-purpose characteristics.",
  },

  Ongole: {
    type: "Draught / Dual purpose",
    origin: "Andhra Pradesh, India",
    climate: "Hot and tropical",
    milk: "Moderate",
    traits: "Large, powerful and heat tolerant",
    uses: "Draught work and breeding",
    description:
      "Ongole cattle are a large indigenous breed from Andhra Pradesh, famous for strength, heat tolerance and their importance in cattle breeding.",
  },

  Pulikulam: {
    type: "Draught",
    origin: "Tamil Nadu, India",
    climate: "Hot and dry",
    milk: "Low",
    traits: "Hardy, agile and resistant",
    uses: "Draught work and traditional farming",
    description:
      "Pulikulam is an indigenous Tamil Nadu breed known for hardiness, agility and adaptation to local dry conditions.",
  },

  Rathi: {
    type: "Dairy / Dual purpose",
    origin: "Rajasthan, India",
    climate: "Hot and arid",
    milk: "Moderate to high",
    traits: "Heat tolerant and productive",
    uses: "Milk production and farming",
    description:
      "Rathi cattle are an important dairy breed of Rajasthan, adapted to hot and dry environments while providing useful milk production.",
  },

  Red_Dane: {
    type: "Dairy",
    origin: "Denmark",
    climate: "Cool to moderate",
    milk: "High",
    traits: "Good dairy performance and strong build",
    uses: "Dairy farming",
    description:
      "Red Dane is a European dairy breed known for its reddish coat, good milk production and strong body structure.",
  },

  Red_Sindhi: {
    type: "Dairy",
    origin: "Sindh region",
    climate: "Hot and arid",
    milk: "Moderate to high",
    traits: "Heat tolerant and hardy",
    uses: "Milk production and breeding",
    description:
      "Red Sindhi is an important indigenous dairy breed known for its reddish coat, heat tolerance and ability to perform under tropical conditions.",
  },

  Sahiwal: {
    type: "Dairy",
    origin: "Punjab region",
    climate: "Hot and tropical",
    milk: "High",
    traits: "Excellent heat tolerance, hardy and good dairy ability",
    uses: "Milk production and breeding",
    description:
      "Sahiwal is one of the best-known indigenous dairy cattle breeds of the Indian subcontinent. It is particularly valued for heat tolerance and reliable milk production.",
  },

  Surti: {
    type: "Buffalo",
    origin: "Gujarat, India",
    climate: "Hot and semi-arid",
    milk: "Moderate",
    traits: "Compact, docile and good milk quality",
    uses: "Dairy farming",
    description:
      "Surti is an indigenous buffalo breed from Gujarat, appreciated for its manageable size, docile nature and useful milk production.",
  },

  Tharparkar: {
    type: "Dairy / Dual purpose",
    origin: "Rajasthan / Sindh region",
    climate: "Hot and arid",
    milk: "Moderate",
    traits: "Excellent drought and heat tolerance",
    uses: "Milk and draught work",
    description:
      "Tharparkar cattle are particularly well adapted to arid environments and are valued for their ability to survive and produce under harsh conditions.",
  },

  Toda: {
    type: "Indigenous",
    origin: "Nilgiri Hills, Tamil Nadu, India",
    climate: "Hilly and cool",
    milk: "Low",
    traits: "Distinctive appearance and strong local adaptation",
    uses: "Traditional livestock keeping",
    description:
      "Toda cattle are a distinctive indigenous breed associated with the Nilgiri Hills of Tamil Nadu and have important cultural and conservation value.",
  },

  Umblachery: {
    type: "Draught",
    origin: "Tamil Nadu, India",
    climate: "Hot and humid",
    milk: "Low",
    traits: "Hardy and suited to wet agricultural areas",
    uses: "Agricultural work",
    description:
      "Umblachery cattle are an indigenous Tamil Nadu breed traditionally used for agricultural work, particularly in wet and rice-growing regions.",
  },

  Vechur: {
    type: "Dairy",
    origin: "Kerala, India",
    climate: "Hot and humid",
    milk: "Low to moderate",
    traits: "Very small size, hardy and climate adapted",
    uses: "Smallholder dairy farming",
    description:
      "Vechur is a very small indigenous cattle breed from Kerala. It is known for its compact size, hardiness and ability to thrive with relatively low resource requirements.",
  },
};

/* =========================================================
   HELPERS
   ========================================================= */

function formatBreedName(name) {
  return name?.replaceAll("_", " ");
}

function getBreedInfo(breed) {
  return (
    BREED_INFO[breed] || {
      type: "Cattle",
      origin: "India",
      climate: "Various environments",
      milk: "Varies by breed",
      traits: "Breed-specific characteristics",
      uses: "Livestock farming",
      description:
        "This cattle breed has characteristics shaped by its genetics, environment and farming practices.",
    }
  );
}

/* =========================================================
   APP
   ========================================================= */

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const selectFile = (selectedFile) => {
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setResult(null);
  };

  const handleFileChange = (e) => {
    selectFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    selectFile(e.dataTransfer.files[0]);
  };

  const analyze = async () => {
    if (!file) return;

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Prediction failed");
      }

      setResult(data);

      setTimeout(() => {
        document.getElementById("knowledge")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 400);

    } catch (error) {
      setResult({
        success: false,
        error:
          "Could not connect to the AI server. Make sure FastAPI is running.",
      });
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const scrollToScanner = () => {
    document.getElementById("scanner")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const predictedBreed =
    result?.success && result?.is_cattle
      ? result.prediction
      : null;

  const breedInfo = predictedBreed
    ? getBreedInfo(predictedBreed)
    : null;

  return (
    <div className="app">

      {/* NAVBAR */}
      <header className="navbar">
        <div className="brand">
          <div className="brand-icon">🐄</div>
          <div>
            <h2>CattleAI</h2>
            <span>Smart Livestock Intelligence</span>
          </div>
        </div>

        <nav>
          <a href="#scanner">AI Scanner</a>
          <a href="#knowledge">Cattle Knowledge</a>
          <a href="#importance">Why It Matters</a>
        </nav>

        <div className="status">
          <span className="status-dot"></span>
          AI Online
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">

          <div className="badge">
            <span>✦</span> AI-POWERED LIVESTOCK TECHNOLOGY
          </div>

          <h1>
            Identify cattle breeds
            <span>with intelligent vision.</span>
          </h1>

          <p>
            Upload a cattle image and let our AI-powered system
            identify the breed from a collection of 41 cattle breeds.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn" onClick={scrollToScanner}>
              🐄 Identify a Breed
              <span>→</span>
            </button>

            <a href="#knowledge" className="secondary-btn">
              Learn about cattle
            </a>
          </div>

          <div className="hero-stats">
            <div>
              <strong>41</strong>
              <span>Breeds</span>
            </div>

            <div>
              <strong>AI</strong>
              <span>Powered</span>
            </div>

            <div>
              <strong>⚡</strong>
              <span>Fast Analysis</span>
            </div>
          </div>

        </div>

        <div className="hero-visual">
          <div className="glow"></div>

          <div className="cow-card">
            <div className="cow-emoji">🐄</div>

            <div className="floating-card card-one">
              <span>🧠</span>
              <div>
                <strong>AI Vision</strong>
                <small>Breed Recognition</small>
              </div>
            </div>

            <div className="floating-card card-two">
              <span>✓</span>
              <div>
                <strong>41 Breeds</strong>
                <small>Indian & global</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCANNER */}
      <main id="scanner" className="main-container">

        <div className="section-heading">
          <div>
            <span className="section-tag">AI BREED SCANNER</span>
            <h2>Discover the breed</h2>
            <p>
              Upload a clear image of cattle to begin AI-powered identification.
            </p>
          </div>

          <div className="accuracy-chip">
            <span>●</span> System Ready
          </div>
        </div>

        <section className="scanner-grid">

          {/* UPLOAD */}
          <div className="scanner-card">

            {!preview ? (
              <div
                className="drop-zone"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
              >
                <div className="upload-circle">
                  <span>↑</span>
                </div>

                <h3>Upload cattle image</h3>

                <p>
                  Drag & drop your image here
                  <br />
                  or select a file from your device
                </p>

                <button
                  className="browse-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    inputRef.current?.click();
                  }}
                >
                  Choose Image
                </button>

                <small>
                  JPG · JPEG · PNG · WEBP · BMP
                </small>
              </div>
            ) : (
              <div className="preview-container">

                <div className="preview-header">
                  <div>
                    <span className="section-tag">SELECTED IMAGE</span>
                    <h3>Ready for analysis</h3>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={reset}
                  >
                    ×
                  </button>
                </div>

                <div className="image-wrapper">
                  <img
                    src={preview}
                    alt="Selected cattle"
                  />

                  <div className="scan-overlay">
                    <span></span>
                  </div>
                </div>

                <div className="file-info">
                  <div className="file-icon">🖼️</div>
                  <div>
                    <strong>{file?.name}</strong>
                    <small>
                      Image ready for AI analysis
                    </small>
                  </div>
                </div>

              </div>
            )}

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />

            {preview && (
              <div className="action-area">
                <button
                  className="analyze-btn"
                  onClick={analyze}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner"></span>
                      Analyzing cattle...
                    </>
                  ) : (
                    <>
                      ✦ Analyze Breed
                      <span>→</span>
                    </>
                  )}
                </button>

                <button
                  className="change-btn"
                  onClick={() => inputRef.current?.click()}
                >
                  Change image
                </button>
              </div>
            )}

          </div>

          {/* RESULTS */}
          <div className="results-card">

            <div className="result-top">
              <div>
                <span className="section-tag">AI ANALYSIS</span>
                <h2>Prediction</h2>
              </div>

              <div className="breed-count">
                41 BREEDS
              </div>
            </div>

            {!result && !loading && (
              <div className="result-empty">
                <div className="ai-icon">
                  ✦
                </div>

                <h3>Waiting for an image</h3>

                <p>
                  Your AI analysis will appear here
                  after you upload a cattle image.
                </p>

                <div className="empty-line"></div>
              </div>
            )}

            {loading && (
              <div className="result-empty">
                <div className="large-spinner"></div>

                <h3>Analyzing image</h3>

                <p>
                  The AI is examining visual characteristics
                  to identify the cattle breed.
                </p>

                <div className="loading-bar">
                  <div></div>
                </div>
              </div>
            )}

            {result &&
              !loading &&
              result.is_cattle === false && (
                <div className="rejected-result">

                  <div className="reject-symbol">
                    ×
                  </div>

                  <span className="section-tag">
                    VERIFICATION FAILED
                  </span>

                  <h2>
                    Image is not of a cattle breed
                  </h2>

                  <p>
                    The uploaded image could not be verified
                    as cattle. Please try a clear image of a cow,
                    ox, or buffalo.
                  </p>

                  <div className="warning-box">
                    <span>⚠</span>
                    Please upload a clear cattle image
                  </div>

                  <button
                    className="try-again-btn"
                    onClick={reset}
                  >
                    Try another image →
                  </button>

                </div>
              )}

            {result &&
              !loading &&
              result.success &&
              result.is_cattle && (
                <div className="prediction-result">

                  <div className="prediction-main">

                    <span className="section-tag">
                      PREDICTED BREED
                    </span>

                    <h1>
                      {formatBreedName(result.prediction)}
                    </h1>

                    <p className="prediction-subtitle">
                      Most likely breed identified by the AI model
                    </p>

                    <div className="confidence-row">
                      <div>
                        <span>Confidence score</span>
                        <strong>
                          {result.confidence.toFixed(1)}%
                        </strong>
                      </div>
                    </div>

                    <div className="confidence-track">
                      <div
                        className="confidence-progress"
                        style={{
                          width: `${Math.min(
                            result.confidence,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>

                  </div>

                  <div className="top3-section">

                    <div className="top3-heading">
                      <span>TOP 3 MATCHES</span>
                      <small>AI ranking</small>
                    </div>

                    {result.top3.map((item, index) => (
                      <div
                        className={`prediction-row ${
                          index === 0 ? "best-match" : ""
                        }`}
                        key={item.breed}
                      >

                        <div className="rank">
                          {index + 1}
                        </div>

                        <div className="breed-name">
                          <strong>
                            {formatBreedName(item.breed)}
                          </strong>

                          {index === 0 && (
                            <span>Best match</span>
                          )}
                        </div>

                        <div className="percentage">
                          {item.confidence.toFixed(1)}%
                        </div>

                      </div>
                    ))}

                  </div>

                  <div
                    className={
                      result.confidence < 50
                        ? "result-note warning"
                        : "result-note success"
                    }
                  >
                    {result.confidence < 50
                      ? "⚠ Low confidence — try a clearer image for a better result."
                      : "✓ AI analysis completed successfully"}
                  </div>

                </div>
              )}

            {result &&
              !result.success && (
                <div className="error-result">

                  <div className="error-icon">
                    !
                  </div>

                  <h3>Something went wrong</h3>

                  <p>{result.error}</p>

                  <button
                    className="try-again-btn"
                    onClick={reset}
                  >
                    Try again
                  </button>

                </div>
              )}

          </div>
        </section>

        {/* INFO STRIP */}
        <section className="info-strip">

          <div className="info-item">
            <div>🧠</div>
            <div>
              <strong>Deep Learning</strong>
              <p>AI-based visual classification</p>
            </div>
          </div>

          <div className="info-item">
            <div>🐄</div>
            <div>
              <strong>41 Breeds</strong>
              <p>Indian and international breeds</p>
            </div>
          </div>

          <div className="info-item">
            <div>⚡</div>
            <div>
              <strong>Quick Results</strong>
              <p>Prediction in seconds</p>
            </div>
          </div>

          <div className="info-item">
            <div>🌱</div>
            <div>
              <strong>Farmer Focused</strong>
              <p>Designed for practical use</p>
            </div>
          </div>

        </section>

        {/* =====================================================
            DYNAMIC BREED KNOWLEDGE
           ===================================================== */}

        <section id="knowledge" className="knowledge-section">

          {!predictedBreed ? (

            <>
              <div className="knowledge-heading">
                <span className="section-tag">
                  CATTLE KNOWLEDGE
                </span>

                <h2>Understanding cattle</h2>

                <p>
                  Identify a breed above to unlock detailed,
                  breed-specific information.
                </p>
              </div>

              <div className="knowledge-grid">

                <div className="knowledge-card large-card">

                  <div className="knowledge-icon">
                    🐄
                  </div>

                  <h3>What are cattle?</h3>

                  <p>
                    Cattle are domesticated bovine animals raised
                    for milk production, meat production, draught
                    work and breeding.
                  </p>

                  <p>
                    Different breeds have developed distinct
                    characteristics based on genetics, environment
                    and farming practices.
                  </p>

                </div>

                <div className="knowledge-card">

                  <div className="knowledge-icon">
                    🥛
                  </div>

                  <h3>Dairy cattle</h3>

                  <p>
                    Dairy breeds are primarily selected for their
                    ability to produce milk efficiently.
                  </p>

                  <div className="knowledge-tag">
                    Milk Production
                  </div>

                </div>

                <div className="knowledge-card">

                  <div className="knowledge-icon">
                    🌾
                  </div>

                  <h3>Draught cattle</h3>

                  <p>
                    Draught breeds are valued for strength,
                    endurance and agricultural work.
                  </p>

                  <div className="knowledge-tag">
                    Farm Work
                  </div>

                </div>

                <div className="knowledge-card">

                  <div className="knowledge-icon">
                    🇮🇳
                  </div>

                  <h3>Indian indigenous breeds</h3>

                  <p>
                    India has many indigenous breeds adapted
                    to local climates and farming systems.
                  </p>

                  <div className="knowledge-tag">
                    Native Breeds
                  </div>

                </div>

                <div className="knowledge-card">

                  <div className="knowledge-icon">
                    🌍
                  </div>

                  <h3>Adaptation</h3>

                  <p>
                    Breed characteristics can influence heat
                    tolerance, productivity and suitability
                    for different environments.
                  </p>

                  <div className="knowledge-tag">
                    Environment
                  </div>

                </div>

              </div>
            </>

          ) : (

            /* =================================================
               BREED-SPECIFIC RESULT
               ================================================= */

            <div className="breed-knowledge">

              <div className="knowledge-heading">

                <span className="section-tag">
                  BREED INTELLIGENCE
                </span>

                <h2>
                  About {formatBreedName(predictedBreed)}
                </h2>

                <p>
                  AI has identified this breed from your uploaded
                  image. Here is useful information specific to
                  the predicted breed.
                </p>

              </div>

              <div className="breed-hero-card">

                <div className="breed-icon-large">
                  🐄
                </div>

                <div className="breed-hero-content">

                  <span className="breed-label">
                    IDENTIFIED BREED
                  </span>

                  <h2>
                    {formatBreedName(predictedBreed)}
                  </h2>

                  <p>
                    {breedInfo.description}
                  </p>

                </div>

                <div className="breed-confidence">

                  <span>AI CONFIDENCE</span>

                  <strong>
                    {result.confidence.toFixed(1)}%
                  </strong>

                </div>

              </div>

              <div className="breed-facts-grid">

                <div className="breed-fact-card">

                  <div className="fact-icon">
                    🌍
                  </div>

                  <div>
                    <span>ORIGIN</span>
                    <strong>
                      {breedInfo.origin}
                    </strong>
                  </div>

                </div>

                <div className="breed-fact-card">

                  <div className="fact-icon">
                    🥛
                  </div>

                  <div>
                    <span>TYPE</span>
                    <strong>
                      {breedInfo.type}
                    </strong>
                  </div>

                </div>

                <div className="breed-fact-card">

                  <div className="fact-icon">
                    🌡️
                  </div>

                  <div>
                    <span>CLIMATE</span>
                    <strong>
                      {breedInfo.climate}
                    </strong>
                  </div>

                </div>

                <div className="breed-fact-card">

                  <div className="fact-icon">
                    🥛
                  </div>

                  <div>
                    <span>MILK POTENTIAL</span>
                    <strong>
                      {breedInfo.milk}
                    </strong>
                  </div>

                </div>

                <div className="breed-fact-card">

                  <div className="fact-icon">
                    💪
                  </div>

                  <div>
                    <span>KEY TRAITS</span>
                    <strong>
                      {breedInfo.traits}
                    </strong>
                  </div>

                </div>

                <div className="breed-fact-card">

                  <div className="fact-icon">
                    🌾
                  </div>

                  <div>
                    <span>PRIMARY USE</span>
                    <strong>
                      {breedInfo.uses}
                    </strong>
                  </div>

                </div>

              </div>

              <div className="breed-insight">

                <div className="insight-icon">
                  💡
                </div>

                <div>

                  <span>FARMER INSIGHT</span>

                  <p>
                    Understanding the characteristics of{" "}
                    <strong>
                      {formatBreedName(predictedBreed)}
                    </strong>{" "}
                    can help farmers make better-informed
                    decisions about livestock management,
                    breeding and environmental suitability.
                  </p>

                </div>

              </div>

            </div>

          )}

        </section>

        {/* WHY IDENTIFICATION MATTERS */}
        <section id="importance" className="importance-section">

          <div className="importance-content">

            <span className="section-tag">
              WHY IT MATTERS
            </span>

            <h2>
              Smarter livestock decisions
              <span>start with better information.</span>
            </h2>

            <p>
              Identifying cattle breeds can support farmers,
              livestock managers and researchers by providing
              useful information about the animals they work with.
            </p>

            <div className="benefits">

              <div>
                <span>01</span>
                <strong>Better breeding decisions</strong>

                <p>
                  Understand breed characteristics when planning
                  livestock breeding.
                </p>
              </div>

              <div>
                <span>02</span>
                <strong>Livestock management</strong>

                <p>
                  Breed information can help organize livestock
                  records and management practices.
                </p>
              </div>

              <div>
                <span>03</span>
                <strong>Breed conservation</strong>

                <p>
                  Recognition technology can contribute to
                  awareness and documentation of indigenous breeds.
                </p>
              </div>

            </div>

          </div>

          <div className="importance-visual">

            <div className="circle-one"></div>
            <div className="circle-two"></div>

            <div className="visual-card">

              <span>✦</span>

              <strong>
                AI + Agriculture
              </strong>

              <p>
                Technology designed to make livestock
                information more accessible.
              </p>

            </div>

          </div>

        </section>

        {preview && (
          <button
            className="reset-analysis"
            onClick={reset}
          >
            ↻ Reset Analysis
          </button>
        )}

      </main>

      {/* FOOTER */}
      <footer className="footer">

        <div className="footer-brand">

          <div className="brand-icon">
            🐄
          </div>

          <div>

            <strong>
              CattleAI
            </strong>

            <span>
              AI-powered cattle breed identification
            </span>

          </div>

        </div>

        <div className="footer-right">

          <span>
            Built for smarter livestock management
          </span>

          <span>•</span>

          <span>
            AI Prototype
          </span>

        </div>

      </footer>

    </div>
  );
}

export default App;