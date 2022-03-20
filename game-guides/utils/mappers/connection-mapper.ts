export function connectionMapper<T>(
  items: T[],
  cursors: string[],
  opts?: { hasNextPage?: boolean },
): Connection<T> {
  const edges: Edge<T>[] = items.map((item, index) => {
    return {
      node: item,
      cursor: cursors[index],
    }
  })

  return {
    items,
    edges,
    pageInfo: {
      hasNextPage: opts?.hasNextPage || false,
      startCursor: edges[0]?.cursor || '',
      endCursor: edges[edges.length - 1]?.cursor || '',
      hasItems: items.length >= 1,
      numItems: items.length,
    },
  }
}
