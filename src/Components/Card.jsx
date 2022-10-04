import React, { useEffect, useState } from 'react'
import "../Styles/Card.css"

export default function Card({ url, id, onSelect, selectedCards, foundPairs }) {

  const [isSelected, setSelected] = useState(false);

  const handleClick = () => {
    // Guard Clause; Check if already selected or move is over
    if (isSelected || selectedCards.length >= 2) return;

    onSelect(id);
    setSelected(true)
  }

  useEffect(() => {
    // Reset card on selectedCards reset if not a found pair
    if (selectedCards.length === 0 && !foundPairs.includes(id)) {
      setSelected(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCards])

  return (
    <div className={"card "} onClick={e => handleClick()}>
      <img className={isSelected ? "open" : "close"} src={url} alt="" />
    </div>
  )
}
