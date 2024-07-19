"use server";
import { revalidatePath } from "next/cache";

export async function invalidatePage(pathname: string) {
  return revalidatePath(pathname);
}
