import { JSDOM } from 'jsdom';

export const extractFromHtml = (html: string, containerSelector: string, subElementSelectors: Record<string, string>): Record<string, string>[] => {
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Find all containers
    const containers = document.querySelectorAll(containerSelector);
    const extractedData: Record<string, string>[] = [];

    containers.forEach((container) => {
        const extractedItem: Record<string, string> = {};
        // Loop through each selector dynamically
        for (const [key, selector] of Object.entries(subElementSelectors)) {

            const element = container.querySelector(selector);
            //extractedItem[key] = element ? element.textContent?.trim() || "" : "Not found";

            if (selector.startsWith("a")) {
                extractedItem[key] = element
                ? element.getAttribute("href") ||
                element.textContent?.trim() ||
                element.getAttribute("src") ||
                element.getAttribute("alt") ||
                "Not found"
                : "Not found";
            } else if (selector.startsWith("img")) {
                extractedItem[key] = element
                ? element.getAttribute("src") ||
                element.textContent?.trim() ||
                element.getAttribute("href") ||
                element.getAttribute("alt") ||
                "Not found"
                : "Not found";
            } else {
                extractedItem[key] = element
                ? element.textContent?.trim() ||
                element.getAttribute("href") ||
                element.getAttribute("src") ||
                element.getAttribute("alt") ||
                "Not found"
                : "Not found";
            }
         }
        extractedData.push(extractedItem);
    });

    return extractedData;
};

export const cleanUpText =  (textInput: string) => {

    // Trim leading and trailing spaces, and normalize multiple spaces to single spaces
    textInput = textInput
    .split('\n') // Split by lines
    .map((line) => line.trim().replace(/\s+/g, ' ')) // Trim & replace multiple spaces with one
    .reduce<string[]>((acc, line) => {
    if (line || (acc[acc.length - 1] && acc[acc.length - 2])) {
        acc.push(line);
    }
    return acc;
    }, [])
    .join('\n'); // Join back into a single string with newlines
    return textInput;
}
