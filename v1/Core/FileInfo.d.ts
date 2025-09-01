/**
 * Page size information for file dimensions
 */
declare interface PageSize {
    /**
     * Width of the page
     */
    Width: number;

    /**
     * Height of the page
     */
    Height: number;
}

/**
 * File information object returned by getFileInfo methods
 */
declare interface FileInfo {
    /**
     * MIME type of the file
     */
    MimeType: string;

    /**
     * Size of the file in bytes
     */
    Size: number;

    /**
     * Number of pages (only set for PDF attachments that can be parsed correctly and when file size is within limitation - 10 MB)
     */
    NumberOfPages: number;

    /**
     * Array of page size items, each having Width and Height properties
     */
    Dimensions: PageSize[];

    /**
     * Number of lines in a text/csv file (only set when readContent flag is set)
     */
    NumberOfRecords: number;

    /**
     * Array of lines with the text file content (only set when readContent flag is set and file size is smaller than limitation - 50KB)
     */
    Content: string[];

    /**
     * Error message (empty if retrieving file information was successful)
     */
    Error: string;
} 