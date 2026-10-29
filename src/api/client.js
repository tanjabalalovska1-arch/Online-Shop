
const BASE_URL = import.meta.env.VITE_API_URL;

// Posebna klasa za API greski
export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

// Pauza pred sledniot obid
function wait(ms, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("Request aborted", "AbortError"));
      return;
    }

    const timeoutId = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);

    function onAbort() {
      clearTimeout(timeoutId);
      signal.removeEventListener("abort", onAbort);
      reject(new DOMException("Request aborted", "AbortError"));
    }

    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

// Centralna funkcija za API baranja
export async function apiClient(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const maxAttempts = 3;

  const config = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const data = await response.json().catch(() => null);

        const error = new ApiError(
          data?.message || `API error: ${response.status}`,
          response.status,
          data,
        );

        // Povtori samo pri privremena serverska greska
        if (response.status >= 500 && attempt < maxAttempts) {
          await wait(1000, options.signal);
          continue;
        }

        throw error;
      }

      return await response.json();
    } catch (err) {
      // Ne povtoruvaj ako baranjeto e otkazano
      if (err.name === "AbortError") {
        throw err;
      }

      // HTTP greskite 4xx ne se povtoruvaat
      if (err instanceof ApiError) {
        throw err;
      }

      // Mreznite greski se povtoruvaat do 3 obidi
      if (attempt === maxAttempts) {
        throw err;
      }

      await wait(1000, options.signal);
    }
  }
}
