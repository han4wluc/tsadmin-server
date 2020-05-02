

* get talbles and custom functions

GET `/models`

```json
{
    "models": [{
        "label": "users",
        "deleatable": "true",
        "columns": [{
            "label": "id",
            "type": "uuid",
            "create": {
                "display": "false"
            },
            "update": {
                "display": "true",
                "editable": "false"
            }
        }, {
            "label": "username",
            "type": "string",
            "create": {
                "display": "true"
            },
            "update": {
                "display": "true",
                "editable": "true"
            }
        }, {
            "label": "nickname",
            "type": "string",
            "create": {
                "display": "true"
            },
            "update": {
                "display": "true",
                "editable": "true"
            }
        }, {
            "label": "age",
            "type": "number",
            "create": {
                "display": "true",
                "default": 18
            },
            "update": {
                "display": "true",
                "editable": "true"
            }
        }, {
            "label": "gender",
            "type": "enum",
            "enum": ["male", "female"],
            "create": {
                "display": "true",
                "default": "male"
            },
            "update": {
                "display": "true",
                "editable": "true"
            }
        }, {
            "label": "company",
            "type": "relationshipOne",
            "relationshipModel": "Company",
            "create": {
                "display": "true"
            },
            "update": {
                "display": "true",
                "editable": "true"
            }
        }, {
            "label": "articles",
            "type": "relationshipMany",
            "relationshipModel": "Article",
            "create": {
                "display": "true"
            },
            "update": {
                "display": "true",
                "editable": "true"
            }
        }, {
            "label": "createdAt",
            "type": "datetime",
            "create": {
                "display": "false"
            },
            "update": {
                "display": "true",
                "editable": "false"
            }
        }, {
            "label": "updatedAt",
            "type": "datetime",
            "create": {
                "display": "false"
            },
            "update": {
                "display": "true",
                "editable": "false"
            }
        }]
    }, {
        "label": "articles"
    }, {
        "label": "company"
    }],
    "customFunctions": [{
        "label": "somelabel",
        "function": "sendNotificationToUser",
        "form": {
            "inputs": [{
                "label": "alertNumber",
                "type": "number",
                "required": true,
                "default": 4
            }, {
                "label": "company",
                "type": "relationshipOne"
                // ...
            }, {
                "label": "payload",
                "type": "json"
            }]
        }
    }]
}
```


* get item

GET
```
/items?
pageNum=1&
pageSize=100&
sort=id:desc,username:asc&
filter=and(username:eq:han4wluc,age:gt:10)
// filter=or(and(username:eq:han4wluc,age:gt:10),username:neq:luciano)
```

default pageNum = 1
default pageSize = 100
default sort = id:desc
default filter = 


```json
{
    "items": [{
        "username": "han4wluc",
        "nickname": "Hanyon",
        "age": 16,
        "createdAt": "...",
        "updatedAt": "..."
    }],
    "page": {
        "num": 1,
        "size": 100,
        "total": 1020
    },
    "sort": {
        "columns": [{
            "column": "id",
            "order": "desc"
        }, {
            "column": "username",
            "order": "asc"
        }]
    }
}
```




* get item

GET `/items/1`

```json
{
    "item": [{
        "username": "han4wluc",
        "nickname": "Hanyon",
        "age": 16,
        "createdAt": "...",
        "updatedAt": "..."
    }]
}
```


* create item

POST `/items`

req
```json
{
    "item": {
        "username": "han4wluc",
        "nickname": "Hanyon",
        "age": 16,
        "company": {
            "create": false,
            "upsert": false,
            "item": {
                "id": 5
            }
        }
    }
}
```

res
```json
{
    "item": [{
        "username": "han4wluc",
        "nickname": "Hanyon",
        "age": 16,
        "createdAt": "...",
        "updatedAt": "..."
    }]
}
```

* update item

PATCH `items/1`

req
```json
{
    "item": {
        "username": "han4wluc2",
    }
}
```

res
```json
{
    "item": [{
        "username": "han4wluc",
        "nickname": "Hanyon",
        "age": 16,
        "createdAt": "...",
        "updatedAt": "..."
    }]
}
```


* delete item

DELETE `items/1`

res
```json
{}
```


* custom function

POST `customFunctions/someCustomFunction`
req
```json
{
    "inputs": {
        // ...
    }
}
```

res
```json
{
    "result": {
        "format": "json",
        "data": {
            // ...
        }
    }
}
```

res
```json
{
    "result": {
        "format": "table",
        "data": {
            "rows": [
                // ...
            ]
        }
    }
}
```

res
```json
{
    "result": {
        "format": "echarts",
        "data": {
            "echarts": [
                // ...
            ]
        }
    }
}
```
