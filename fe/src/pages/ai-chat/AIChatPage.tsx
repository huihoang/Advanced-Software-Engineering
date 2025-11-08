import { PATH } from "@/constants";
import { useSendMessage } from "@/hooks/chats";
import type { DepartmentDto } from "@/types/dto";
import { t } from "@/utils/i18n";
import { MedicineBoxOutlined, SendOutlined } from "@ant-design/icons";
import {
  Alert,
  Button,
  Card,
  Flex,
  Image,
  Input,
  List,
  Space,
  Spin,
  Tag,
  Typography,
} from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const AIChatPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [suggestedDepartments, setSuggestedDepartments] = useState<
    DepartmentDto[]
  >([]);
  const [hasSearched, setHasSearched] = useState(false);

  const { mutate, isPending } = useSendMessage();

  const handleSendMessage = () => {
    if (!message.trim()) return;

    setHasSearched(true);
    mutate(
      { message: message.trim() },
      {
        onSuccess: (response) => {
          console.log("AI Response:", response);
          setSuggestedDepartments(response.suggested_department_ids || []);
        },
        onError: (error) => setSuggestedDepartments([]),
      }
    );
  };

  const handleViewDoctors = (departmentId: number) => {
    navigate(`${PATH.DOCTORS}?departmentId=${departmentId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg !rounded-2xl border-0 !mb-6">
          <Flex align="center" gap="large" className="mb-4">
            <Image
              src="/images/ai-chat.png"
              alt="AI Assistant"
              preview={false}
              width={60}
              height={60}
              className="object-contain"
            />
            <div>
              <Title level={3} className="!mb-1">
                {t("aiChatTitle")}
              </Title>
              <Text type="secondary">{t("aiChatDescription")}</Text>
            </div>
          </Flex>
        </Card>

        <Card className="shadow-lg !rounded-2xl border-0 !mb-6">
          <Space direction="vertical" className="w-full" size="large">
            <div>
              <Text strong className="block mb-2">
                {t("messageInput")}
              </Text>
              <TextArea
                placeholder={t("notePlaceholder")}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                size="large"
                disabled={isPending}
                className="rounded-xl"
                onPressEnter={(e) => {
                  if (e.ctrlKey || e.metaKey) {
                    handleSendMessage();
                  }
                }}
              />
              <Text type="secondary" className="text-xs mt-1 block">
                Press Ctrl + Enter to send
              </Text>
            </div>

            <Button
              type="primary"
              size="large"
              icon={<SendOutlined />}
              onClick={handleSendMessage}
              loading={isPending}
              disabled={!message.trim() || isPending}
              block
              className="rounded-xl h-12"
            >
              {isPending ? t("sending") : t("sendMessage")}
            </Button>
          </Space>
        </Card>

        {isPending && (
          <Card className="shadow-lg rounded-2xl border-0">
            <Flex justify="center" align="center" gap="middle">
              <Spin size="large" />
              <Text type="secondary" className="text-lg">
                {t("aiThinking")}
              </Text>
            </Flex>
          </Card>
        )}

        {!isPending && hasSearched && (
          <Card
            className="shadow-lg rounded-2xl border-0"
            title={
              <Flex align="center" gap="small">
                <MedicineBoxOutlined className="text-xl text-green-500" />
                <Text strong className="text-lg">
                  {t("suggestedDepartments")}
                </Text>
              </Flex>
            }
          >
            {suggestedDepartments.length > 0 ? (
              <List
                dataSource={suggestedDepartments}
                renderItem={(department, index) => (
                  <List.Item
                    key={department.id}
                    actions={[
                      <Button
                        type="link"
                        onClick={() => handleViewDoctors(department.id)}
                      >
                        {t("viewDoctors")} →
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Tag color="blue" className="text-base px-3 py-1">
                          #{index + 1}
                        </Tag>
                      }
                      title={
                        <Text strong className="text-base">
                          {department.name}
                        </Text>
                      }
                    />
                  </List.Item>
                )}
              />
            ) : (
              <Alert
                message={t("noSuggestions")}
                type="info"
                showIcon
                className="rounded-xl"
              />
            )}
          </Card>
        )}
      </div>
    </div>
  );
};

export default AIChatPage;
