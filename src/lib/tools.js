export const categories = [
 {id:'image',name:'Image Tools',description:'Resize, convert and optimize images in your browser.'},
 {id:'pdf',name:'PDF Tools',description:'Combine, split and convert PDF documents.'},
 {id:'text',name:'Text Tools',description:'Count, transform and compare text.'},
 {id:'developer',name:'Developer Tools',description:'Format, encode and validate everyday data.'},
 {id:'generator',name:'Generators',description:'Create QR codes, secure passwords, colors and more.'}
];
const make=(slug,name,category,description,icon)=>({slug,name,category,description,icon});
export const tools=[
 make('image-compressor','Image Compressor','image','Reduce image file size while balancing visual quality.','Image'),
 make('image-resizer','Image Resizer','image','Resize an image to exact dimensions or a percentage.','Scan'),
 make('jpg-to-png','JPG to PNG','image','Convert JPEG images to PNG format.','FileImage'),
 make('png-to-jpg','PNG to JPG','image','Convert PNG images to compact JPEG files.','FileImage'),
 make('webp-converter','WebP Converter','image','Convert common image formats to modern WebP.','FileImage'),
 make('image-format-converter','Image Format Converter','image','Convert images between PNG, JPEG and WebP.','RefreshCw'),
 make('pdf-merger','PDF Merger','pdf','Combine multiple PDF documents into one file.','Files'),
 make('pdf-splitter','PDF Splitter','pdf','Extract a page range into a new PDF.','Scissors'),
 make('pdf-to-images','PDF to Images','pdf','Export each PDF page as a PNG image.','Images'),
 make('images-to-pdf','Images to PDF','pdf','Combine images into a downloadable PDF.','FilePlus'),
 make('pdf-page-extractor','PDF Page Extractor','pdf','Select individual pages to create a new PDF.','FileOutput'),
 make('word-counter','Word Counter','text','Count words, characters, sentences and reading time.','WholeWord'),
 make('character-counter','Character Counter','text','Count characters with and without spaces.','ALargeSmall'),
 make('case-converter','Case Converter','text','Convert text to uppercase, lowercase and title case.','CaseSensitive'),
 make('remove-extra-spaces','Remove Extra Spaces','text','Clean repeated spaces and unnecessary blank lines.','AlignLeft'),
 make('text-reverser','Text Reverser','text','Reverse text by character, word or line.','Repeat'),
 make('text-diff-checker','Text Diff Checker','text','Compare two text blocks and inspect changed lines.','GitCompare'),
 make('json-formatter','JSON Formatter','developer','Format and validate JSON with readable errors.','Braces'),
 make('json-validator','JSON Validator','developer','Check whether a JSON value is valid.','BadgeCheck'),
 make('html-formatter','HTML Formatter','developer','Beautify HTML markup with consistent indentation.','Code'),
 make('css-minifier','CSS Minifier','developer','Minify CSS to reduce whitespace and comments.','Minimize2'),
 make('javascript-minifier','JavaScript Minifier','developer','Minify JavaScript using a parser-based minifier.','FileCode'),
 make('base64-encoder','Base64 Encoder','developer','Encode plain text as Base64.','Binary'),
 make('base64-decoder','Base64 Decoder','developer','Decode Base64 text into readable content.','Binary'),
 make('url-encoder','URL Encoder','developer','Encode text for safe use in URLs.','Link'),
 make('url-decoder','URL Decoder','developer','Decode percent-encoded URL text.','Unlink'),
 make('uuid-generator','UUID Generator','developer','Generate random version 4 UUID identifiers.','Fingerprint'),
 make('qr-code-generator','QR Code Generator','generator','Create a downloadable QR code from text or a URL.','QrCode'),
 make('password-generator','Password Generator','generator','Generate strong random passwords in your browser.','KeyRound'),
 make('random-number-generator','Random Number Generator','generator','Generate random integers within a chosen range.','Dices'),
 make('lorem-ipsum-generator','Lorem Ipsum Generator','generator','Generate placeholder paragraphs, sentences or words.','Text'),
 make('color-picker','Color Picker','generator','Choose a color and copy HEX, RGB or HSL values.','Palette'),
 make('css-gradient-generator','CSS Gradient Generator','generator','Build a CSS linear gradient and copy its code.','Blend')
];
export const toolBySlug=Object.fromEntries(tools.map(t=>[t.slug,t]));
