import { ZodError } from "zod";

export type ServerActionResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };

function normalizeError(error: unknown): string {
  if (error instanceof ZodError) {
    const issues = error.issues
      .map((issue) => `${issue.path.join(".") || "input"}: ${issue.message}`)
      .join("; ");

    return `Invalid input. ${issues}`;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unexpected error while processing action.";
}

export async function executeAction<T>(
  executor: () => Promise<T>,
): Promise<ServerActionResult<T>> {
  try {
    const data = await executor();

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: normalizeError(error),
    };
  }
}
