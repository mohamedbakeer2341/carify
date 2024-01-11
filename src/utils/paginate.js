export const paginate = async function paginateModel({model, query, offset, limit, sort, populate}) {
    let queryBuilder = model.find(query).sort(sort).skip(offset).limit(limit).collation({ locale: 'en', strength: 2 });
    
    if (populate) {
        queryBuilder = queryBuilder.populate(populate);
    }
    return await queryBuilder;
}
