export const paginate = async function paginateModel({model, selectFields, query, offset, limit, sort}) {
    return await model.find(query).select(selectFields).sort(sort).skip(offset).limit(limit)
}