const catchError = (error: any) => {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
    };
  }

  return { name: "Something is wrong!", message: `${error}` };
};

export { catchError };
