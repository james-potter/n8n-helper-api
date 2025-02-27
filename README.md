﻿# URL Helper API  

A simple Express-based API to fetch URL content, extract metadata, and parse elements using CSS selectors.  

## Features  
- Fetch webpage content via URL  
- Extract metadata from articles (title, byline, content, length, excerpt, etc.)  
- Extract specific elements using CSS selectors  

## Installation  

1. Clone the repository:  

   ```bash
   git clone https://github.com/your-repo/n8n-helper-api.git
   cd n8n-helper-api
   ```

2. Install dependencies:  

   ```bash
   npm install
   ```

3. Start the server:  

   ```bash
   npm run dev
   ```

   By default, the API runs on `http://localhost:3000`.  

## API Endpoints  

### Fetch Full Content  
**GET** `/v1/url/fetch`  
**POST** `/v1/url/fetch`  

Fetch the full content of a webpage.  

#### Request Parameters  
| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| `url`     | string | Yes      | The URL to fetch |

#### Responses  
- **200**: Successfully fetched content  
- **400**: Missing URL parameter  
- **500**: Failed to fetch URL  

---

### Fetch Metadata  
**POST** `/v1/url/metadata`  

Fetch metadata from a webpage, including title, byline, content, length, excerpt, and site name.  

#### Request Parameters  
| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| `url`     | string | Yes      | The URL to fetch |
| `readab`  | string | No       | Enable readability extraction (`true`/`false`, default: `false`) |

#### Responses  
**200**: Successfully fetched metadata  
```json
{
  "title": "Sample Article Title",
  "byline": "Author Name",
  "content": "Full article text...",
  "length": 2345,
  "excerpt": "Short summary of article...",
  "siteName": "Example Site"
}
```
- **400**: Missing URL parameter  
- **500**: Failed to fetch URL  

---

### Extract Content Using CSS Selectors  
**POST** `/v1/url/cssextract`  

Extract specific content from a webpage based on CSS selectors.  

#### Request Body  
```json
{
  "url": "https://example.com",
  "cssClass": ".main-content",
  "selectors": {
    "title": ".wp-block-heading",
    "description": ".article-content p",
    "image": ".post-thumbnail img"
  }
}
```

| Field      | Type   | Required | Description |
|------------|--------|----------|-------------|
| `url`      | string | Yes      | The URL to fetch |
| `cssClass` | string | Yes      | Main CSS class containing the block to extract |
| `selectors`| object | Yes      | JSON object defining CSS selectors to extract |

#### Responses  
**200**: Successfully extracted content  
```json
[
  {
    "title": "Example Page Title",
    "description": "This is the first paragraph of the article.",
    "image": "https://example.com/sample-image.jpg"
  },
  {
    "title": "Another Article Title",
    "description": "Another description from the page.",
    "image": "https://example.com/another-image.jpg"
  }
]
```
- **400**: Missing or invalid parameters  
- **500**: Server error while fetching URL  

---

## Running Tests  

Run the test suite with:  

```bash
npm test
```

## Contributing  

1. Fork the repository  
2. Create a feature branch (`git checkout -b feature-branch`)  
3. Commit your changes (`git commit -m 'Add new feature'`)  
4. Push to the branch (`git push origin feature-branch`)  
5. Open a Pull Request  

## License  
This project is licensed under the [MIT License](LICENSE).  
