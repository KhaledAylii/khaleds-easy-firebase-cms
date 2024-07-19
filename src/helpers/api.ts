import { BASE_URL } from "./paths";

export const getEntry = async <T = object>(
  entryId: string,
  entryType: string,
  isServer: boolean = false
): Promise<T | null | undefined> => {
  try {
    const response = await fetch(
      isServer
        ? `${BASE_URL}/api/fb/entries/${entryType}/get/${entryId}`
        : `/api/fb/entries/${entryType}/get/${entryId}`
    );
    const data = await response.json();
    const cleanedData = JSON.parse(data.data.content);
    return cleanedData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const listEntries = async <T = object>(
  entryType: string,
  isServer: boolean = false
): Promise<{ [key: string]: T } | null | undefined> => {
  try {
    const response = await fetch(
      isServer
        ? `${BASE_URL}/api/fb/entries/${entryType}/list`
        : `/api/fb/entries/${entryType}/list`
    );
    const data = await response.json();
    const cleanedData: { [key: string]: T } | null = {};
    if (!data?.data) return cleanedData;
    Object.entries(data.data as { [key: string]: { content: string } }).forEach(
      ([key, value]) => {
        cleanedData[key] = JSON.parse(value.content);
      }
    );
    return cleanedData as { [key: string]: T };
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
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function deleteEntry(entryId: string, entryType: string) {
  try {
    const response = await fetch(
      `/api/fb/entries/${entryType}/delete/${entryId}`,
      {
        method: "POST",
      }
    );
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
