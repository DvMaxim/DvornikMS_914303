export const Map = () => {
  return (
    <div className="contacts-map" style={{ marginTop: "20px" }}>
      <iframe
        src="https://maps.google.com/maps?q=%D0%9C%D0%B8%D0%BD%D1%81%D0%BA,%20%D1%83%D0%BB.%20%D0%AF%D0%BA%D1%83%D0%B1%D0%B0%20%D0%9A%D0%BE%D0%BB%D0%B0%D1%81%D0%B0,%2028&t=&z=13&ie=UTF8&iwloc=&output=embed"
        width="100%"
        height="450"
        style={{ border: 0 }}
        loading="lazy"
      ></iframe>
    </div>
  );
};
