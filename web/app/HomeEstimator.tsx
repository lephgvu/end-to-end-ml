"use client";

import { useMemo, useState } from "react";

const features = [
  { key: "RM", label: "Average rooms", hint: "Rooms per home nearby", min: 3.5, max: 9, step: 0.1 },
  { key: "LSTAT", label: "Lower-income residents", hint: "Share of neighborhood population", min: 1, max: 38, step: 0.5, suffix: "%" },
  { key: "CRIM", label: "Crime rate", hint: "Per-capita area index", min: 0, max: 20, step: 0.1 },
  { key: "DIS", label: "Employment distance", hint: "Weighted distance to job centers", min: 1, max: 12, step: 0.1 },
  { key: "ZN", label: "Large-lot zoning", hint: "Residential land zoned for large lots", min: 0, max: 100, step: 1, suffix: "%" },
  { key: "INDUS", label: "Non-retail land", hint: "Business acreage in the area", min: 0.5, max: 28, step: 0.1, suffix: "%" },
  { key: "CHAS", label: "Charles River", hint: "Does the tract border the river?", min: 0, max: 1, step: 1, binary: true },
  { key: "NOX", label: "Air pollution", hint: "Nitric oxide concentration", min: 0.35, max: 0.9, step: 0.01 },
  { key: "AGE", label: "Older homes", hint: "Homes built before 1940", min: 2, max: 100, step: 1, suffix: "%" },
  { key: "RAD", label: "Highway access", hint: "Accessibility index", min: 1, max: 24, step: 1 },
  { key: "TAX", label: "Property tax rate", hint: "Per $10,000 of value", min: 180, max: 720, step: 1 },
  { key: "PTRATIO", label: "Pupil–teacher ratio", hint: "Students per teacher nearby", min: 12, max: 23, step: 0.1 },
  { key: "B", label: "Demographic index", hint: "Dataset-derived community measure", min: 0, max: 397, step: 1 },
] as const;

type FeatureKey = (typeof features)[number]["key"];
type Values = Record<FeatureKey, number>;

const presets: Record<string, Values> = {
  "Balanced suburb": {
    CRIM: 0.12, ZN: 18, INDUS: 7.2, CHAS: 0, NOX: 0.48, RM: 6.4,
    AGE: 61, DIS: 4.3, RAD: 4, TAX: 310, PTRATIO: 17.4, B: 390, LSTAT: 10.2,
  },
  "City connected": {
    CRIM: 1.15, ZN: 0, INDUS: 12.8, CHAS: 0, NOX: 0.62, RM: 5.9,
    AGE: 88, DIS: 2.1, RAD: 8, TAX: 420, PTRATIO: 19.1, B: 372, LSTAT: 16.8,
  },
  "Roomy riverside": {
    CRIM: 0.06, ZN: 35, INDUS: 3.4, CHAS: 1, NOX: 0.42, RM: 7.4,
    AGE: 34, DIS: 6.7, RAD: 3, TAX: 245, PTRATIO: 14.8, B: 394, LSTAT: 5.6,
  },
};

const primaryKeys: FeatureKey[] = ["RM", "LSTAT", "CRIM", "DIS"];

function formatValue(value: number, suffix?: string) {
  return `${Number.isInteger(value) ? value : value.toFixed(2).replace(/0$/, "")}${suffix ?? ""}`;
}

export function HomeEstimator() {
  const [values, setValues] = useState<Values>(presets["Balanced suburb"]);
  const [activePreset, setActivePreset] = useState("Balanced suburb");
  const [prediction, setPrediction] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const primary = useMemo(
    () => primaryKeys.map((key) => features.find((feature) => feature.key === key)!),
    [],
  );
  const advanced = useMemo(
    () => features.filter((feature) => !primaryKeys.includes(feature.key)),
    [],
  );

  function updateValue(key: FeatureKey, value: number) {
    setValues((current) => ({ ...current, [key]: value }));
    setActivePreset("");
    setPrediction(null);
  }

  function choosePreset(name: string) {
    setActivePreset(name);
    setValues(presets[name]);
    setPrediction(null);
    setError("");
  }

  async function predict() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json()) as { prediction?: number; error?: string };
      if (!response.ok || typeof data.prediction !== "number") {
        throw new Error(data.error || "The estimate could not be calculated.");
      }
      setPrediction(data.prediction);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "The estimate could not be calculated.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <nav className="nav shell" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Hearthline home">
          <span className="brand-mark" aria-hidden="true">H</span>
          <span>HEARTHLINE</span>
        </a>
        <a className="nav-link" href="#method">How it works <span aria-hidden="true">↘</span></a>
      </nav>

      <section className="hero shell" id="top">
        <div className="eyebrow"><span /> ML-POWERED ESTIMATOR · BOSTON</div>
        <h1>See the signal<br />behind the <em>sale.</em></h1>
        <p className="hero-copy">
          Turn neighborhood data into a fast, grounded price estimate—powered by
          a random forest model trained on Boston housing patterns.
        </p>
        <div className="proof-row">
          <div><strong>13</strong><span>signals analyzed</span></div>
          <div><strong>0.89</strong><span>model R² score</span></div>
          <div><strong>&lt; 1 min</strong><span>to your estimate</span></div>
        </div>
        <a className="scroll-cue" href="#estimate" aria-label="Go to estimator">
          <span aria-hidden="true">↓</span> BUILD YOUR ESTIMATE
        </a>
      </section>

      <section className="estimator-section" id="estimate">
        <div className="shell estimator-intro">
          <div>
            <span className="section-number">01</span>
            <h2>Describe the area.</h2>
          </div>
          <p>Start with a profile, then fine-tune the details you know.</p>
        </div>

        <div className="shell workspace">
          <form
            className="controls"
            onSubmit={(event) => {
              event.preventDefault();
              void predict();
            }}
          >
            <fieldset className="preset-fieldset">
              <legend>QUICK PROFILES</legend>
              <div className="presets">
                {Object.keys(presets).map((name) => (
                  <button
                    className={activePreset === name ? "preset active" : "preset"}
                    key={name}
                    type="button"
                    onClick={() => choosePreset(name)}
                    aria-pressed={activePreset === name}
                  >
                    <span className="preset-dot" />
                    {name}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="input-grid">
              {primary.map((feature) => (
                <label className="control-card" key={feature.key}>
                  <span className="control-heading">
                    <span><strong>{feature.label}</strong><small>{feature.hint}</small></span>
                    <output>{formatValue(values[feature.key], feature.suffix)}</output>
                  </span>
                  <input
                    aria-label={feature.label}
                    type="range"
                    min={feature.min}
                    max={feature.max}
                    step={feature.step}
                    value={values[feature.key]}
                    onChange={(event) => updateValue(feature.key, Number(event.target.value))}
                  />
                  <span className="range-labels">
                    <span>{formatValue(feature.min, feature.suffix)}</span>
                    <span>{formatValue(feature.max, feature.suffix)}</span>
                  </span>
                </label>
              ))}
            </div>

            <details className="advanced">
              <summary>
                <span>Fine-tune all signals</span>
                <small>9 additional model inputs</small>
              </summary>
              <div className="advanced-grid">
                {advanced.map((feature) =>
                  feature.binary ? (
                    <label className="toggle-row" key={feature.key}>
                      <span><strong>{feature.label}</strong><small>{feature.hint}</small></span>
                      <button
                        className={values[feature.key] === 1 ? "toggle on" : "toggle"}
                        type="button"
                        role="switch"
                        aria-checked={values[feature.key] === 1}
                        onClick={() => updateValue(feature.key, values[feature.key] === 1 ? 0 : 1)}
                      >
                        <span />
                      </button>
                    </label>
                  ) : (
                    <label className="number-row" key={feature.key}>
                      <span><strong>{feature.label}</strong><small>{feature.hint}</small></span>
                      <span className="number-wrap">
                        <input
                          type="number"
                          aria-label={feature.label}
                          min={feature.min}
                          max={feature.max}
                          step={feature.step}
                          value={values[feature.key]}
                          onChange={(event) => updateValue(feature.key, Number(event.target.value))}
                        />
                        {feature.suffix && <span>{feature.suffix}</span>}
                      </span>
                    </label>
                  ),
                )}
              </div>
            </details>
          </form>

          <aside className="result-card" aria-live="polite">
            <span className="result-kicker">MODEL ESTIMATE</span>
            <div className={prediction === null ? "price placeholder" : "price"}>
              {prediction === null ? (
                <>
                  <span className="price-symbol">$</span>
                  <strong>—</strong>
                </>
              ) : (
                <>
                  <span className="price-symbol">$</span>
                  <strong>{Math.round(prediction * 1000).toLocaleString("en-US")}</strong>
                </>
              )}
            </div>
            <p className="price-note">
              {prediction === null
                ? "Adjust the signals, then run the model."
                : "Estimated home value based on the selected neighborhood profile."}
            </p>

            {prediction !== null && (
              <div className="benchmark">
                <span>DATASET BENCHMARK</span>
                <strong>{prediction >= 22.5 ? "Above typical" : "Below typical"}</strong>
                <div className="benchmark-track">
                  <span style={{ width: `${Math.min(100, Math.max(8, prediction * 2))}%` }} />
                </div>
              </div>
            )}

            {error && <p className="error" role="alert">{error}</p>}
            <button className="predict-button" type="submit" onClick={predict} disabled={loading}>
              <span>{loading ? "Running the model…" : "Calculate estimate"}</span>
              <span aria-hidden="true">{loading ? "···" : "→"}</span>
            </button>
            <p className="disclaimer">Educational estimate, not a professional appraisal.</p>
          </aside>
        </div>
      </section>

      <section className="method shell" id="method">
        <div className="method-title">
          <span className="section-number">02</span>
          <h2>From raw data<br />to a clearer decision.</h2>
        </div>
        <div className="steps">
          <article><span>01</span><div><strong>You set the context</strong><p>Thirteen housing, access, and neighborhood measures create a single area profile.</p></div></article>
          <article><span>02</span><div><strong>The model finds patterns</strong><p>A random forest compares your inputs with relationships learned from historic Boston housing data.</p></div></article>
          <article><span>03</span><div><strong>You get a benchmark</strong><p>The output is translated from thousands of dollars into one clear, readable estimate.</p></div></article>
        </div>
      </section>

      <footer>
        <div className="shell footer-inner">
          <div className="brand footer-brand"><span className="brand-mark" aria-hidden="true">H</span><span>HEARTHLINE</span></div>
          <p>Built as an end-to-end machine learning demonstration.</p>
          <a href="#top">BACK TO TOP ↑</a>
        </div>
      </footer>
    </main>
  );
}
