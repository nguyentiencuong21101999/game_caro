const option = () => {
    const option = {
        onUploadProgress: (ProgressEvent) => {
            const { loaded, total } = ProgressEvent;
            let percent = Math.floor(loaded * 100 / total)
            console.log(percent);
        }
    }
    return option
}

export { option }