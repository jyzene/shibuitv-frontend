import React from 'react';

const ScheduleTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse border-b-2 border-wood w-full text-left text-wood">
        <tbody>
          <tr>
            <td className="border-b-2 font-subtitle border-wood px-2 py-1">06:00</td>
            <td className="border-b-2 font-subtitle border-wood px-2 py-1">Row 1, Col 2</td>
            <td className="border-b-2 font-subtitle border-wood px-2 py-1">Row 1, Col 3</td>
          </tr>
          <tr>
            <td className="border-b-2 font-paragraph border-wood px-2 py-1">Row 2, Col 1</td>
            <td className="border-b-2 font-paragraph border-wood px-2 py-1">Row 2, Col 2</td>
            <td className="border-b-2 font-paragraph border-wood px-2 py-1">Row 2, Col 3</td>
          </tr>
          <tr>
            <td className="border-b-2 font-paragraph border-wood px-2 py-1">Row 3, Col 1</td>
            <td className="border-b-2 font-paragraph border-wood px-2 py-1">Row 3, Col 2</td>
            <td className="border-b-2 font-paragraph border-wood px-2 py-1">Row 3, Col 3</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;
