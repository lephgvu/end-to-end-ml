const REQUIRED_FEATURES = [
  "CRIM", "ZN", "INDUS", "CHAS", "NOX", "RM",
  "AGE", "DIS", "RAD", "TAX", "PTRATIO", "B", "LSTAT",
];

export async function POST(request: Request) {
  try {
    const payload = await request.json() as Record<string, unknown>;
    const cleanPayload = Object.fromEntries(
      REQUIRED_FEATURES.map((key) => [key, Number(payload[key])]),
    );

    if (Object.values(cleanPayload).some((value) => !Number.isFinite(value))) {
      return Response.json({ error: "Please check every input and try again." }, { status: 400 });
    }

    const response = await fetch("https://housing-app-rqh8.onrender.com/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cleanPayload),
      signal: AbortSignal.timeout(30_000),
    });

    if (!response.ok) {
      throw new Error("Prediction service returned an error.");
    }

    const result = await response.json() as { prediction?: number };
    if (typeof result.prediction !== "number") {
      throw new Error("Prediction service returned an invalid result.");
    }

    return Response.json(result);
  } catch {
    return Response.json(
      { error: "The model is warming up. Please try again in a moment." },
      { status: 503 },
    );
  }
}
