import React from "react";
import { ReactComponent as IconGearFill } from "bootstrap-icons/icons/gear-fill.svg";
import { ReactComponent as IconPercent } from "bootstrap-icons/icons/percent.svg";
import { ReactComponent as IconEnvelope } from "bootstrap-icons/icons/envelope.svg";
import { ReactComponent as IconTrash } from "bootstrap-icons/icons/trash.svg";
import { ReactComponent as IconBell } from "bootstrap-icons/icons/bell.svg";

const SettingForm = () => {
  return (
    <div className="card border-danger">
      <h6 className="card-header">
        <IconGearFill className="text-danger" /> Settiing
      </h6>
      <ul className="list-group list-group-flush">
        <li className="list-group-item bg-danger text-white">
          <p>Danger Zone!</p>
          <button type="button" className="btn btn-sm btn-light">
            <IconTrash /> Delete Account{" "}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SettingForm;
