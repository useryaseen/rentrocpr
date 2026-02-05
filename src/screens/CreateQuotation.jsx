import "../App.css";
import { useLocation, Link } from "react-router-dom";
import { useMemo, useState } from "react";

const timeOptions = [
  { label: "1 Day", value: "1" },
  { label: "3 Days", value: "3" },
  { label: "7 Days", value: "7" },
];

export default function CreateQuotation() {
  const location = useLocation();
  const product = location.state?.product;

  const [clientName, setClientName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [serviceDays, setServiceDays] = useState("3");

  const priceLabel = useMemo(() => {
    const price = product?.productFor?.rent?.monthlyPrice;
    if (!price) return "AED 0 / month";
    return `AED ${Number(price).toFixed(0)} / month`;
  }, [product]);

  return (
    <section className="screen">
      <div className="screen-header">
        <h2>Create Quotation</h2>
        <p>Fill in client details and confirm the selected product.</p>
      </div>

      {!product ? (
        <div className="empty-state">
          <p>No product selected yet.</p>
          <Link to="/new-quotation" className="primary-btn">
            Choose a Product
          </Link>
        </div>
      ) : (
        <div className="quotation-layout">
          <div className="selected-product">
            <h3>Selected Product</h3>
            <div className="product-card">
              <div className="product-image">
                {product.images?.[0]?.imageUrl ? (
                  <img src={product.images[0].imageUrl} alt={product.name} />
                ) : (
                  <span>No Image</span>
                )}
              </div>
              <div className="product-details">
                <h4>{product.name}</h4>
                <p>{product.description}</p>
                <span className="price">{priceLabel}</span>
              </div>
            </div>
          </div>

          <form className="quotation-form">
            <div className="form-field">
              <label htmlFor="client-name">Client Name</label>
              <input
                id="client-name"
                type="text"
                placeholder="Enter client name"
                value={clientName}
                onChange={(event) => setClientName(event.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="quantity">Quantity</label>
              <input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(event) => setQuantity(Number(event.target.value))}
              />
            </div>
            <div className="form-field">
              <label>Service Timeline</label>
              <div className="timeline-options">
                {timeOptions.map((option) => (
                  <label key={option.value} className="timeline-chip">
                    <input
                      type="radio"
                      name="service-days"
                      value={option.value}
                      checked={serviceDays === option.value}
                      onChange={(event) => setServiceDays(event.target.value)}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>
            <button className="primary-btn" type="button">
              Create Quotation
            </button>
          </form>
        </div>
      )}
    </section>
  );
}
