import { Col, Collapse, Row } from "antd";
import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { CalendarOutlined, EnvironmentOutlined } from "@ant-design/icons";
import PrimarButton from "../../../bibilio/Buttons/PrimaryButton";
import { scroll } from "../../../apis/utils/utils";
import useIsMobile from "../../../bibilio/mobileVersion/useIsMobile";
import JobRequest from "./JobRequest";

interface JobsCollapseProps {
  jobs: any;
  certificateJobs: any;
}

const JobsCollapse = ({ jobs, certificateJobs }: JobsCollapseProps) => {
  const [activeKey, setActiveKey] = useState<string | undefined>("0");
  const [jobId, setJobId] = useState<number | string>(-1);
  const currentRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const toggleCollapse = (key: string) => {
    setActiveKey((prevKey) => (prevKey === key ? undefined : key));
  };

  useEffect(() => {
    scroll(currentRef);
  }, []);

  return (
    <div className="ghaith--collapse-profile-container">
      <Collapse
        className={`ghaith--collapse-beneficiary-services ghaith--collapse-profile ghaith--survey-collapse `}
        ref={currentRef}
        activeKey={activeKey}
        onChange={(key) => setActiveKey(key as any)}
        accordion
      >
        {jobs?.map((element: any, index: number) => (
          <Collapse.Panel
            key={index.toString()}
            showArrow={false}
            collapsible="icon"
            className="ghaith--header-jobs-panel ghaith--jobs-opportunities"
            header={
              <div className="ghaith--header-profile-container">
                <Row
                  justify={"center"}
                  style={{ marginBottom: "0" }}
                  align={"stretch"}
                >
                  <Col xxl={6} xl={7} lg={5} md={5} sm={12} xs={24}>
                    <img
                      width={"100%"}
                      height={200}
                      style={{ objectFit: "cover", borderRadius: "15px" }}
                      src={element?.image_ids}
                      alt=""
                    />
                  </Col>
                  <Col xxl={18} xl={17} lg={19} md={19} sm={12} xs={24}>
                    <Row
                      justify={"center"}
                      style={{ marginBottom: "0" }}
                      align={"stretch"}
                    >
                      <Col
                        xxl={15}
                        xl={14}
                        lg={12}
                        md={12}
                        sm={24}
                        xs={24}
                        className="ghaith--job-title-container"
                      >
                        <div className="ghaith--job-title-collapse">
                          <span>{element?.name}</span>
                        </div>
                        <div className="ghaith--jobs-subtitle">
                          <EnvironmentOutlined
                            style={{ fontSize: "25px", color: "#d9d9d9" }}
                          />
                          <span>{element?.address}</span>
                        </div>
                        <div className="ghaith--jobs-subtitle">
                          <CalendarOutlined
                            style={{ fontSize: "25px", color: "#d9d9d9" }}
                          />
                          <span>
                            {element?.published_date
                              ? dayjs(
                                  element?.published_date,
                                  "YYYY-MM-DD"
                                ).format("YYYY/MM/DD")
                              : ""}
                          </span>
                        </div>
                      </Col>

                      <Col
                        xxl={8}
                        xl={8}
                        lg={11}
                        md={11}
                        sm={24}
                        xs={24}
                        style={{
                          display: "flex",
                          alignItems: "end",
                          marginBottom: "1rem",
                          justifyContent: isMobile ? "center" : "end",
                          gap: "1rem",
                        }}
                      >
                        <PrimarButton
                          title="التفاصيل"
                          className={`ghaith--apply-job-detail-button ${
                            activeKey === index.toString()
                              ? "ghaith--clicked-job"
                              : ""
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCollapse(index.toString());
                          }}
                        />
                        <PrimarButton
                          title="التقديم"
                          className="ghaith--apply-job-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setJobId(element.id);
                          }}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            }
          >
            <Row
              className={`ghaith--content-profile-box1`}
              justify={"space-around"}
              gutter={16}
            >
              <Col
                xxl={3}
                xl={3}
                lg={3}
                md={3}
                sm={10}
                xs={10}
                className="ghaith--content-profile-col"
              >
                <p className="ghaith--content-services-request-p">
                  الشروط العامة :
                </p>
              </Col>

              <Col
                xxl={6}
                xl={6}
                lg={6}
                md={6}
                sm={14}
                xs={14}
                className="ghaith--content-profile-col"
              >
                <span
                  className="ghaith--content-services-request-span ghaith--color-span"
                  dangerouslySetInnerHTML={{
                    __html: element?.general_terms || "",
                  }}
                />
              </Col>

              <Col
                xxl={3}
                xl={3}
                lg={3}
                md={3}
                sm={10}
                xs={10}
                className="ghaith--content-profile-col"
              >
                <p className="ghaith--content-services-request-p">
                  المهارات المطلوبة :
                </p>
              </Col>

              <Col
                xxl={6}
                xl={6}
                lg={6}
                md={6}
                sm={14}
                xs={14}
                className="ghaith--content-profile-col"
              >
                <span
                  className="ghaith--content-services-request-span ghaith--color-span"
                  dangerouslySetInnerHTML={{
                    __html: element?.required_skills || "",
                  }}
                />
              </Col>
            </Row>

            <Row
              className={`ghaith--content-profile-box1`}
              justify={"space-around"}
              gutter={16}
            >
              <Col
                xxl={3}
                xl={3}
                lg={3}
                md={3}
                sm={10}
                xs={10}
                className="ghaith--content-profile-col"
              >
                <p className="ghaith--content-services-request-p">
                  المتطلبات الوظيفية :
                </p>
              </Col>

              <Col
                xxl={6}
                xl={6}
                lg={6}
                md={6}
                sm={14}
                xs={14}
                className="ghaith--content-profile-col"
              >
                <span
                  className="ghaith--content-services-request-span ghaith--color-span"
                  dangerouslySetInnerHTML={{
                    __html: element?.job_requirements || "",
                  }}
                />
              </Col>
              <Col
                xxl={3}
                xl={3}
                lg={3}
                md={3}
                sm={6}
                xs={6}
                className="ghaith--content-profile-col"
              ></Col>

              <Col
                xxl={6}
                xl={6}
                lg={6}
                md={6}
                sm={6}
                xs={6}
                className="ghaith--content-profile-col"
              ></Col>
            </Row>
          </Collapse.Panel>
        ))}
      </Collapse>

      <JobRequest
        isModalVisible={jobId !== -1}
        setIsModalVisible={() => setJobId(-1)}
        jobId={jobId}
        certificateJobs={certificateJobs}
      />
    </div>
  );
};

export default JobsCollapse;
