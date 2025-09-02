/**
 * This module provides access to file information functionality in pricing scripts.
 * The file handling system provides comprehensive information about uploaded files,
 * allowing scripts to make pricing decisions based on file characteristics including:
 * - File type and MIME type information
 * - File size and dimensional data
 * - Page count for multi-page documents
 * - Content analysis for text-based files
 * - Error handling for file processing
 * 
 * @module File
 */

/**
 * Page size information for file dimensions.
 * This interface provides dimensional data for individual pages
 * within multi-page documents, useful for calculating costs based
 * on document complexity and size.
 */
declare interface PageSize {
    /**
     * The width of the page in points.
     * This value represents the horizontal dimension of the page
     * and is used for calculating printing costs and layout considerations.
     * 
     * @example
     * var pageWidth = pageSize.Width;
     * var pageHeight = pageSize.Height;
     * var pageArea = pageWidth * pageHeight;
     */
    Width: number;

    /**
     * The height of the page in points.
     * This value represents the vertical dimension of the page
     * and is used for calculating printing costs and layout considerations.
     * 
     * @example
     * var pageWidth = pageSize.Width;
     * var pageHeight = pageSize.Height;
     * var pageArea = pageWidth * pageHeight;
     */
    Height: number;
}

/**
 * Comprehensive file information object returned by getFileInfo methods.
 * This interface provides detailed information about uploaded files,
 * allowing pricing scripts to make decisions based on file characteristics
 * such as size, type, dimensions, and content.
 * 
 * File information is essential for file-based pricing models where
 * costs are calculated based on file properties rather than just
 * product specifications.
 */
declare interface FileInfo {
    /**
     * The MIME type of the file.
     * This value indicates the file format and type, allowing scripts
     * to apply different pricing logic based on file type.
     * 
     * @example
     * if (fileInfo.MimeType === "application/pdf") {
     *     return Item.Price + (fileInfo.NumberOfPages * 0.50); // $0.50 per page
     * } else if (fileInfo.MimeType.startsWith("image/")) {
     *     return Item.Price + 2.00; // $2.00 for image files
     * }
     */
    MimeType: string;

    /**
     * The size of the file in bytes.
     * This value is used for size-based pricing models and to determine
     * processing costs based on file complexity.
     * 
     * @example
     * if (fileInfo.Size > 1024 * 1024) { // > 1MB
     *     return Item.Price * 1.2; // 20% markup for large files
     * }
     */
    Size: number;

    /**
     * The number of pages in the document.
     * This value is only set for PDF attachments that can be parsed correctly
     * and when the file size is within the 10 MB limitation.
     * Used for page-based pricing models.
     * 
     * @example
     * if (fileInfo.NumberOfPages > 0) {
     *     return Item.Price + (fileInfo.NumberOfPages * 0.25); // $0.25 per page
     * }
     */
    NumberOfPages: number;

    /**
     * Array of page size items, each having Width and Height properties.
     * This array provides dimensional information for each page in the document,
     * allowing for precise cost calculations based on page dimensions.
     * 
     * @example
     * var totalArea = 0;
     * for (var i = 0; i < fileInfo.Dimensions.length; i++) {
     *     var page = fileInfo.Dimensions[i];
     *     totalArea += page.Width * page.Height;
     * }
     * return Item.Price + (totalArea * 0.0001); // Cost based on total area
     */
    Dimensions: PageSize[];

    /**
     * The number of lines in a text/csv file.
     * This value is only set when the readContent flag is set during
     * file information retrieval. Used for line-based pricing models.
     * 
     * @example
     * if (fileInfo.NumberOfRecords > 0) {
     *     return Item.Price + (fileInfo.NumberOfRecords * 0.01); // $0.01 per line
     * }
     */
    NumberOfRecords: number;

    /**
     * Array of lines with the text file content.
     * This array is only set when the readContent flag is set and the file
     * size is smaller than the 50KB limitation. Used for content-based pricing.
     * 
     * @example
     * if (fileInfo.Content && fileInfo.Content.length > 0) {
     *     var lineCount = fileInfo.Content.length;
     *     return Item.Price + (lineCount * 0.005); // $0.005 per line
     * }
     */
    Content: string[];

    /**
     * Error message indicating any issues encountered during file processing.
     * This value is empty if retrieving file information was successful.
     * Used for error handling and debugging file processing issues.
     * 
     * @example
     * if (fileInfo.Error) {
     *     error("File processing error: " + fileInfo.Error);
     *     return Item.Price; // Fallback to base price
     * }
     */
    Error: string;
} 