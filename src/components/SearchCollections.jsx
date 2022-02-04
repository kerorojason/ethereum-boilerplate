import { Select } from "antd";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { getCollectionsByChain } from "helpers/collections";

const { Option } = Select;

function SearchCollections({ collectionAddress, onChange }) {
  const { chainId } = useMoralisDapp();
  const NFTCollections = getCollectionsByChain(chainId);

  return (
    <>
      <Select
        showSearch
        style={{ width: "1000px", marginLeft: "20px" }}
        placeholder="Find a Collection"
        optionFilterProp="children"
        onChange={onChange}
        value={collectionAddress}
      >
        {NFTCollections &&
          NFTCollections.map((collection, i) => (
            <Option value={collection.addrs} key={i}>
              {collection.name}
            </Option>
          ))}
      </Select>
    </>
  );
}

export default SearchCollections;
