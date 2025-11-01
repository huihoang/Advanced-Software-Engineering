import DateFilter from "@/components/custom/DateFilter";
import { DATE_FORMAT_DTO, PATH } from "@/constants";
import { useGetDoctor } from "@/hooks/doctors";
import { formatCurrency } from "@/utils/common";
import { getFormattedDate } from "@/utils/datetime";
import { t } from "@/utils/i18n";
import {
  ArrowLeftOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Descriptions,
  Flex,
  Image,
  Rate,
  Row,
  Space,
  Spin,
  Tag,
  Typography,
  theme,
} from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DoctorProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = theme.useToken();

  const { data: doctor, isLoading, isError } = useGetDoctor(id || "");

  const [filterDate, setFilterDate] = useState<Date>(new Date());

  const displayedShifts =
    doctor?.shifts.filter(
      (s) => getFormattedDate(s.date) === getFormattedDate(filterDate)
    ) ?? [];

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Space size="large" direction="vertical" className="mt-8 mb-20 w-full">
      <Button onClick={() => navigate(-1)} icon={<ArrowLeftOutlined />}>
        {t("back")}
      </Button>

      {isError || !doctor ? (
        <Card className="!mt-4">{t("doctorNotFound")}</Card>
      ) : (
        <>
          <Card>
            <Row gutter={24}>
              <Col xs={24} sm={8} md={6} lg={6}>
                <Flex vertical align="center" className="items-center">
                  <Image
                    src={doctor.image || "/images/doctor.png"}
                    width={160}
                    height={160}
                    preview={false}
                    className="rounded-full object-cover"
                  />
                  <Typography.Title
                    level={4}
                    style={{ color: token.colorPrimary }}
                    className="mt-4"
                  >
                    {doctor.firstName} {doctor.lastName}
                  </Typography.Title>
                  <Typography.Text type="secondary">
                    {doctor.specialization?.name}
                  </Typography.Text>

                  <div className="mt-3">
                    <Rate
                      disabled
                      allowHalf
                      defaultValue={doctor.rating ?? 0}
                    />
                  </div>
                </Flex>
              </Col>

              <Col xs={24} sm={16} md={18} lg={18}>
                <Space
                  direction="vertical"
                  size="large"
                  style={{ width: "100%" }}
                >
                  <div>
                    <Typography.Title level={5}>{t("about")}</Typography.Title>
                    <Typography.Paragraph>
                      {doctor.bio ?? t("noBiography")}
                    </Typography.Paragraph>
                  </div>

                  <Row gutter={20}>
                    <Col xs={24} sm={12}>
                      <Typography.Title level={5}>
                        {t("professionalInfo")}
                      </Typography.Title>
                      <Descriptions column={1} bordered size="small">
                        <Descriptions.Item label={t("license")}>
                          {doctor.licenseNumber ?? "N/A"}
                        </Descriptions.Item>
                        <Descriptions.Item label={t("citizen")}>
                          {doctor.citizen?.name ?? "N/A"}
                        </Descriptions.Item>
                        <Descriptions.Item label={t("department")}>
                          {doctor.specialization?.name ?? "N/A"}
                        </Descriptions.Item>
                      </Descriptions>
                    </Col>

                    <Col xs={24} sm={12}>
                      <Typography.Title level={5}>
                        {t("contact")}
                      </Typography.Title>
                      <Descriptions column={1} bordered size="small">
                        <Descriptions.Item label={t("email")}>
                          <MailOutlined className="mr-2" /> {doctor.email}
                        </Descriptions.Item>
                        <Descriptions.Item label={t("phone")}>
                          <PhoneOutlined className="mr-2" />{" "}
                          {doctor.phoneNumber}
                        </Descriptions.Item>
                      </Descriptions>
                    </Col>
                  </Row>
                </Space>
              </Col>
            </Row>
          </Card>

          <Row gutter={24} className="mt-4">
            <Col xs={24} lg={12}>
              <Card>
                <Space
                  direction="vertical"
                  size="small"
                  style={{ width: "100%" }}
                >
                  <div className="flex items-center justify-between">
                    <Typography.Title level={5}>
                      {t("workSchedule")}
                    </Typography.Title>
                    <DateFilter value={filterDate} onChange={setFilterDate} />
                  </div>

                  {!displayedShifts || displayedShifts.length === 0 ? (
                    <Typography.Text>{t("noShifts")}</Typography.Text>
                  ) : (
                    <Row gutter={16}>
                      {displayedShifts.map((shift) => (
                        <Col key={shift.id} xs={24} sm={12} md={8} lg={6}>
                          <Button
                            className="shadow-sm w-full"
                            size="large"
                            onClick={() =>
                              navigate(PATH.APPOINTMENT_DETAIL(shift.id))
                            }
                          >
                            {shift.time}
                          </Button>
                        </Col>
                      ))}
                    </Row>
                  )}
                </Space>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card>
                <Typography.Title level={5}>{t("clinicInfo")}</Typography.Title>
                <Descriptions column={1} bordered size="small">
                  <Descriptions.Item label={t("name")}>
                    {doctor.clinicInfo.name}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("address")}>
                    {doctor.clinicInfo.address}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("consultationFee")}>
                    {doctor.consultationFee != null
                      ? formatCurrency(doctor.consultationFee)
                      : "-"}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Space>
  );
};

export default DoctorProfilePage;
