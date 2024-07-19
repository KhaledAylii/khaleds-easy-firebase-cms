export const getEntry = async (
  entryId: string,
  entryType: string
): Promise<{ [key: string]: string } | undefined> => {
  try {
    const response = await fetch(`/api/fb/entries/${entryType}/get/${entryId}`);
    const data = await response.json();
    return data as { [key: string]: string };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
export const listEntries = async (
  entryType: string
): Promise<{ [key: string]: string } | undefined> => {
  try {
    const response = await fetch(`/api/fb/entries/${entryType}/list`);
    const data = await response.json();
    return data as { [key: string]: string };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export async function upsertEntry(
  entryId: string,
  entryType: string,
  content: object
) {
  try {
    const response = await fetch(
      `/api/fb/entries/${entryType}/upsert/${entryId}`,
      {
        method: "POST",
        body: JSON.stringify({ content: JSON.stringify(content) }),
      }
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
