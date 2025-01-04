---
title: Immersio Server API v1.0.0
language_tabs:
  - http: HTTP
  - javascript: Javascript
  - python: Python
language_clients:
  - http: ""
  - javascript: ""
  - python: ""
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="immersio-server-api">Immersio Server API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Base URLs:

* <a href="immersio-server.azurewebsites.net">immersio-server.azurewebsites.net</a>

 License: MIT

<h1 id="immersio-server-api-lessons">Lessons</h1>

## Content for a specific lesson

<a id="opIdshowLessonById"></a>

> Code samples

```http
GET immersio-server.azurewebsites.net/lessons/{lessonId} HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('immersio-server.azurewebsites.net/lessons/{lessonId}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('immersio-server.azurewebsites.net/lessons/{lessonId}', headers = headers)

print(r.json())

```

`GET /lessons/{lessonId}`

<h3 id="content-for-a-specific-lesson-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|lessonId|path|string|true|The id of the lesson to retrieve|

> Example responses

> 200 Response

```json
{
  "id": 0,
  "name": "string",
  "tag": "string"
}
```

<h3 id="content-for-a-specific-lesson-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Expected response to a valid request|[Lesson](#schemalesson)|
|default|Default|unexpected error|[Error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_Lesson">Lesson</h2>
<!-- backwards compatibility -->
<a id="schemalesson"></a>
<a id="schema_Lesson"></a>
<a id="tocSlesson"></a>
<a id="tocslesson"></a>

```json
{
  "id": 0,
  "name": "string",
  "tag": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer(int64)|true|none|none|
|name|string|true|none|none|
|tag|string|false|none|none|

<h2 id="tocS_Error">Error</h2>
<!-- backwards compatibility -->
<a id="schemaerror"></a>
<a id="schema_Error"></a>
<a id="tocSerror"></a>
<a id="tocserror"></a>

```json
{
  "code": 0,
  "message": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|code|integer(int32)|true|none|none|
|message|string|true|none|none|

