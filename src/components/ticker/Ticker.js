import React, { Component } from "react";
import { NewsTicker } from "react-announcement-ticker";
import "./Ticker.css";

function Ticker() {
  return (
    <div className="tickerbox">
      <NewsTicker
        tickerBorderColor="#A7BFE8"
        title={"Announcements & News"}
        titleBackground={
          "linear-gradient(141deg, #0fb8ad 0%, #1fc8db 51%, #2cb5e8 75%)"
        }
        newsList={[
          {
            text:
              "Pradhan Mantri Garib Kalyan Package: Insurance Scheme for Health Workers Fighting COVID-19",
            link:
              "https://www.mohfw.gov.in/pdf/FAQPradhanMantriGaribKalyanPackageInsuranceSchemeforHealthWorkersFightingCOVID19.pdf"
          },
          {
            text:
              "Private persons are those who are engaged by both public & private health care institutions/organization ",
            link: "http://google.com"
          },
          {
            text:
              "Private persons are those who are engaged by both public & private health care institutions/organization ",
            link: "https://wblc.gov.in/user-manual-and-sop"
          },
          {
            text:
              "Public healthcare providers including community health workers, who may have to be in direct contact and care of COVID-19 patients and who may be at risk of being impacted by this. ",
            link: "http://cnn.com"
          },
          {
            text:
              "REGISTRATION OF PRINCIPAL EMPLOYER UNDER CONTRACT LABOUR (REGULATION & ABOLITION) ACT, 1970",
            link: "http://cnn.com"
          },
          {
            text:
              "Private persons are those who are engaged by both public & private health care institutions/organization ",
            link: "https://wblc.gov.in/user-manual-and-sop"
          },
          {
            text:
              "INSPECTION NOTE - UPLOAD BY INSPECTORS & DOWNLOAD BY APPLICANT",
            link: "http://cnn.com"
          }
        ]}
      />
    </div>
  );
}
export default Ticker;