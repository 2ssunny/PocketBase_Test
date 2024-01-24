/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ywkkcwme73izjhd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fsph8s9b",
    "name": "TItle",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ywkkcwme73izjhd")

  // remove
  collection.schema.removeField("fsph8s9b")

  return dao.saveCollection(collection)
})
