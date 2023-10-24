function customSearch(products, searchQuery) {
    const searchResults = products
        .filter(product => matchesSearchQuery(product, searchQuery))
        .sort((a, b) => compareRelevance(b, a, searchQuery));
    return searchResults;
}

function matchesSearchQuery(product, searchQuery) {
    const productName = product.name.toLowerCase();
    const query = searchQuery.toLowerCase();
    return productName.includes(query);
}

function compareRelevance(productA, productB, searchQuery) {
    const query = searchQuery.toLowerCase();
    const relevanceA = countOccurrences(productA.name.toLowerCase(), query);
    const relevanceB = countOccurrences(productB.name.toLowerCase(), query);

    return relevanceA - relevanceB;
}

function countOccurrences(text, query) {
    const regex = new RegExp(query, 'g');
    return (text.match(regex) || []).length;
}

module.exports = customSearch;