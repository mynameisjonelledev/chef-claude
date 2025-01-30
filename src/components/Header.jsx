import chefBlack from '../assets/chefBlack.png';

export function Header() {
  return(
    <>
    <div className="header-con">
      <div className="img-con">
        <img src={chefBlack} alt="Chef Jonelle" className="img-brand" />
      </div>
      <div className="header-brand">Chef Jonelle</div>
    </div>
    </>
  );
}