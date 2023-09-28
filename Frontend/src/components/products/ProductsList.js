import ProductSummary from './ProductSummary';

const ChaletsList = (props) => {
  return (
    <div className="grid grid-cols-2 gap-5 justify-center items-center">
      {props.chalets.map((p) => (
        <ProductSummary chalet={p} key={p._id} />
      ))}
    </div>
  );
};

export default ChaletsList;
