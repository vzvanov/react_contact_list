import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { Context } from "..";
import { PAGE_LIMIT } from "../store/ContactStore";

const Pagination = () => {
  const { contact } = useContext(Context);

  const onClickPrev = () => {
    contact.setPage(contact.page - 1);
    contact.setLastPage(false);
  }

  const limits = [PAGE_LIMIT, 2 * PAGE_LIMIT, 3 * PAGE_LIMIT, 4 * PAGE_LIMIT, 5 * PAGE_LIMIT, 6 * PAGE_LIMIT];

  const dropdownClick = (limit) => {
    contact.setPage(1);
    contact.setLimit(limit);
  }

  return (
    <div className="mt-2 d-flex justify-content-center">
      <Button disabled={contact.page <= 1 ? true : false} className="m-2" variant="outline-dark" onClick={onClickPrev}>Пред.</Button>
      <Button disabled={contact.lastPage} className="m-2" variant="outline-dark" onClick={() => contact.setPage(contact.page + 1)}>След.</Button>
      <Dropdown className="mt-2 ">
        <Dropdown.Toggle variant="outline-dark" >{`на странице:  ${contact.limit}`}</Dropdown.Toggle>
        <Dropdown.Menu>
          {limits.map(limit =>
            <Dropdown.Item
              onClick={() => dropdownClick(limit)}
              key={limit}
            >
              {limit}
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div >
  );
};

export default observer(Pagination);