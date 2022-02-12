const parseError = (error) => {
    console.log({ error });
    if (error.errors) {
        return "An error";
    }

    return "An error occurred";
};

export default parseError