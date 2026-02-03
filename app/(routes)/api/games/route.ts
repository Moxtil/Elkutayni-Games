export async function GET() {
  try {
    const res = await fetch(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_KEY}&page_size=50`,
      { cache: "no-store" }
    );

    const data = await res.json();

    return Response.json(data.results); 
  } catch (err) {
    return Response.json({ error: "Failed to fetch RAWG data" }, { status: 500 });
  }
}
