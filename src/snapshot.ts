export const getAssetsByCollection = async (url: string, collection: string) => {
  console.time('getAssetsByCollection');
  let page = 1;
  let assetList: { id: string; owner: string }[] = [];

  while (true) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'my-id',
        method: 'searchAssets',
        params: {
          grouping: ['collection', collection],
          page: page,
          limit: 1000,
          burnt: false,
          sortBy: { sortBy: 'id', sortDirection: 'asc' },
        },
      }),
    });
    const { result } = await response.json();

    if (result.items.length === 0) {
      break;
    }

    const owners = result.items.map((item: any) => ({
      id: item.id,
      owner: item.ownership.owner,
    }));
    assetList.push(...owners);
    page++;
  }

  const resultData = {
    totalResults: assetList.length,
    results: assetList,
  };
  console.timeEnd('getAssetsByCollection');
  return JSON.stringify(resultData, null, 2);
};
