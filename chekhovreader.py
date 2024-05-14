import fitz  # imports the pymupdf library
import re  # imports the regular expressions library

# Define the patterns to filter out
pattern = re.compile(r'[\s\d-]*(http:\/\/booksiread\.org|A Life in Letters \(Penguin Classics\))[\s\d-]*')

doc = fitz.open("chekovletters.pdf")  # open a document
with open("chekovletters.txt", "w") as f:  # open a text file
    for page in doc:  # iterate the document pages
        text = page.get_text()  # get plain text encoded as UTF-8
        text = re.sub(pattern, '', text) # Filter out the patterns
        lines = text.split('\n')
        clean_lines = [line.strip().rstrip("-") for line in lines]
        text = ' '.join(clean_lines)
        f.write(text)  # write filtered text to file
