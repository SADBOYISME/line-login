"use client"

import type { ProFormInstance } from '@ant-design/pro-components';
import {
    ProCard,
    ProFormCheckbox,
    ProFormSelect,
    ProFormText,
    StepsForm,
    ProFormRadio,
    PageContainer
} from '@ant-design/pro-components';
import { Watermark, message, Avatar, Space, Result, Button, Typography, List, Col, Row } from 'antd';
import { useEffect, useRef, useState } from 'react';
import liff from '@line/liff';
import { LoadingOutlined } from '@ant-design/icons';
import ListCountry from '@/utils/list-country';
import IndustyOptions from '@/utils/list-industy';

const { Paragraph, Text, Title } = Typography;
const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

const liffId: string = '2004715229-2vR586jr';
const initLiff = async (liffId: string) => {
    await liff.init({ liffId: liffId })
    if (!liff.isLoggedIn()) {
        liff.login()
        return false
    }
    const profile = await liff.getProfile()
    console.log('profile', profile)
    return profile
}



function Page() {
    const [init, setInit] = useState<any>(null)
    const [signOut, setSignOut] = useState<any>(false)

    const signOutApp = async () => {
        liff.logout()
        setSignOut(!signOut)
    }

    useEffect(() => {
        console.log('useEffect')
        initLiff(liffId)
            .then((res: any) => {
                setInit(res)
            })
    }, [signOut])
    const formRef = useRef<ProFormInstance>();
    if (!init) {
        return (
            <Result
                icon={<LoadingOutlined />}
                title="Loading... Please wait a moment."
            />
        )
    }
    return (

        <Watermark
            content="Spacial Campaign"
            zIndex={1}

        >
            <PageContainer
                title="TCI Campaign"
                extra={
                    <Space>
                        <Avatar shape="square" size={50} src={init?.pictureUrl} />
                        {/* <Button onClick={signOutApp} type='primary' danger>Sign Out</Button> */}
                    </Space>
                }
            >
                <ProCard>
                    <StepsForm<{
                        name: string;
                    }>
                        formRef={formRef}
                        onFinish={async (values) => {
                            await waitTime(1000);
                            message.success('Submit finished!');

                            console.log(values);
                        }}
                        formProps={{
                            validateMessages: {
                                required: 'Field is required!',
                            },
                        }}
                    >
                        <StepsForm.StepForm<{
                            name: string;
                        }>
                            name="base"
                            title="Personal Information"
                            stepProps={{
                                description: 'Register your personal information',
                            }}
                            onFinish={async () => {
                                console.log(formRef.current?.getFieldsValue());
                                await waitTime(2000);
                                return true;
                            }}
                        >
                            {/* hiden form store line profile */}
                            <ProFormText
                                name="lineUserId"
                                label="Line User ID"
                                width="md"
                                disabled={true}
                                // hidden
                                initialValue={init?.userId}
                            />

                            <ProFormText
                                name="lineName"
                                label="Line Name"
                                width="md"
                                disabled={true}
                                // hidden
                                initialValue={init?.displayName}
                            />

                            <ProFormText
                                name="linePicture"
                                label="Line Picture URL"
                                width="md"
                                disabled={true}
                                // hidden
                                initialValue={init?.pictureUrl}
                            />


                            {/* add Existing Customer? use  */}

                            <ProFormRadio.Group
                                name="existingCustomer"
                                label="Existing Customer?"
                                width="md"
                                options={[
                                    {
                                        value: 'y',
                                        label: 'Yes',
                                    },
                                    {
                                        value: 'n',
                                        label: 'No',
                                    },

                                ]}
                                rules={[{ required: true }]}


                            />

                            <ProFormText
                                name="companyName"
                                label="Company Name"
                                width="md"
                                tooltip="your company name"
                                placeholder="Please enter your company name"
                                rules={[{ required: true }]}
                            />

                            <ProFormText
                                name="titel"
                                label="Title"
                                width="md"
                                tooltip=""
                                placeholder="Optional"

                            />


                            <ProFormText
                                name="firstName"
                                label="First Name"
                                width="md"
                                tooltip="your first name"
                                placeholder="Please enter your first name"
                                rules={[{ required: true, type: 'string' }]}
                            />

                            <ProFormText
                                name="lastName"
                                label="Last Name"
                                width="md"
                                tooltip="your last name"
                                placeholder="Please enter your last name"
                                rules={[{ required: true, type: 'string' }]}
                            />

                            <ProFormText
                                name="email"
                                label="Email"
                                width="md"
                                tooltip="your email"
                                placeholder="Please enter your email"
                                rules={[{ required: true, type: 'email' }]}
                            />

                            {/* phone number */}
                            <ProFormText
                                name="phone"
                                label="Phone"
                                width="md"
                                tooltip="your phone number"
                                placeholder="Please enter your phone number"
                                rules={[{ required: true, type: 'string', pattern: /^[0-9]+$/ }]}
                            />

                            <ProFormSelect
                                name="industry"
                                label="Industry"
                                width="md"
                                tooltip="your industry"
                                placeholder="Please enter your industry"
                                rules={[{ required: true }]}
                                options={IndustyOptions}
                            />


                            <ProFormSelect
                                name="country"
                                label="Country"
                                width="md"
                                tooltip="your industry"
                                placeholder="Please enter your country"
                                rules={[{ required: true }]}
                                options={
                                    ListCountry()
                                }
                            />


                        </StepsForm.StepForm>


                        <StepsForm.StepForm<{
                            checkbox: string;
                        }>
                            name="productInterest"
                            title="Product Interest"
                            stepProps={{
                                description: 'which type of analysis you want to do?',
                            }}
                            onFinish={async () => {
                                console.log(formRef.current?.getFieldsValue());
                                return true;
                            }}
                        >
                            <ProFormCheckbox.Group
                                name="productInterestAnalytical"
                                label="Analytical Chemistry Type"
                                width="md"
                                options={['Analytical Chemistry- Analytical Chemistry- Electrophoresis',
                                    'Analytical Chemistry- HPLC', 'Analytical Chemistry- Resins and Media',
                                    'Analytical Chemistry- Standards', 'Analytical Chemistry- NMR', 'Analytical Chemistry- GC',
                                    'Life Science- Biochemicals', 'Life Science- Glycoscience', 'Life Science- Molecular Biology',

                                ]}

                            />

                            <ProFormCheckbox.Group
                                name="productInterestChemistry"
                                label="Chemistry Type"
                                width="md"
                                options={['Chemistry- Asymmetric Synthesis', 'Chemistry- Chemical Biology', 'Chemistry- Drug Discovery Research Reagents',
                                    'Chemistry- Solvents', 'Chemistry- Synthetic Reagents', 'Chemistry- Organometallic Reagents', 'Chemistry- Building Blocks',
                                    'Chemistry- Catalysis and Inorganic Chemistry',
                                ]}

                            />

                            {/* Life Science */}
                            <ProFormCheckbox.Group
                                name="productInterestLifeScience"
                                label="Life Science Type"
                                width="md"
                                options={['Life Science- Biochemicals', 'Life Science- Glycoscience', 'Life Science- Molecular Biology'

                                ]}

                            />

                            {/* Materials Science */}
                            <ProFormCheckbox.Group
                                name="productInterestMaterialsScience"
                                label="Materials Science Type"
                                style={{ color: 'red' }}
                                width="md"
                                options={['Materials Science- Battery Materials',
                                    'Materials Science- Biomaterials', 'Materials Science- NanocarbonMaterials', 'Materials Science- Electronics Materials',
                                    'Materials Science- Polymer/Macromolecule Reagents'
                                ]}

                            />

                        </StepsForm.StepForm>


                        <StepsForm.StepForm
                            name="time"
                            title="Privacy and policy"
                            stepProps={{
                                description: 'Please read the agreement before submitting the form',
                            }}

                        >


                            {/* <ProCard title="Privacy and policy"
                                extra={"1/01/2022"}
                                split={'horizontal'}
                                spellCheck={true}
                                style={{ overflowY: 'auto', height: '500px', width: '300px' }}
                            > */}

                            {/* <Title level={3}>Acceptable Use Policy</Title> */}

                            <Title level={3}>Introduction</Title>
                            <Paragraph>
                                This Acceptable Use Policy (the Policy) outlines the acceptable use of data collected from customers by [Your Company Name] (Company) in compliance with applicable laws and regulations. By accessing or using our services, you agree to comply with this Policy. Failure to comply may result in the termination of services.
                            </Paragraph>

                            <Title level={3}>Data Collection</Title>
                            <List
                                split={false}

                                dataSource={[
                                    'Company collects data from customers for the purpose of providing services, improving user experience, and complying with legal obligations.',
                                    'Data collected may include personal information such as name, email address, and contact information.',
                                    'Company may also collect usage data, cookies, and other tracking technologies to enhance services and tailor content.',
                                ]}
                                renderItem={(item) => <List.Item>{item}</List.Item>}
                            />

                            <Title level={3}>Acceptable Use</Title>
                            <Paragraph>
                                Customers agree to:
                            </Paragraph>
                            <List

                                dataSource={[
                                    'Provide accurate and up-to-date information.',
                                    'Use services in compliance with applicable laws and regulations.',
                                    'Respect the privacy and rights of other users.',
                                    'Not engage in any activity that may compromise the security or integrity of Company\'s systems or data.',
                                ]}
                                renderItem={(item) => <List.Item>{item}</List.Item>}
                            />

                            <Title level={3}>Prohibited Activities</Title>
                            <Paragraph>
                                Customers shall not:
                            </Paragraph>
                            <List

                                dataSource={[
                                    'Share login credentials or access to their accounts.',
                                    'Attempt to gain unauthorized access to Company\'s systems or data.',
                                    'Transmit any malicious software, viruses, or harmful code.',
                                    'Use services for any unlawful, fraudulent, or abusive purpose.',
                                    'Engage in any activity that violates the rights of others.',
                                ]}
                                renderItem={(item) => <List.Item>{item}</List.Item>}
                            />

                            <Title level={2}>Privacy Policy</Title>

                            <Title level={3}>Introduction</Title>
                            <Paragraph>
                                This Privacy Policy outlines how Company collects, uses, and protects data obtained from customers. By using our services, you consent to the collection and use of your data as described in this Policy.
                            </Paragraph>

                            <Title level={3}>Information Collection</Title>
                            <List

                                dataSource={[
                                    'Company collects personal information provided by customers, including but not limited to name, email address, and contact information.',
                                    'Company may also collect usage data, cookies, and other tracking technologies to analyze trends, administer services, and personalize content.',
                                ]}
                                renderItem={(item) => <List.Item>{item}</List.Item>}
                            />

                            <Title level={3}>Use of Information</Title>
                            <Paragraph>
                                Company may use collected data for the following purposes:
                            </Paragraph>
                            <List

                                dataSource={[
                                    'Providing and improving services.',
                                    'Communicating with customers about products, services, and updates.',
                                    'Analyzing usage trends and preferences.',
                                    'Complying with legal obligations and protecting Company\'s rights.',
                                ]}
                                renderItem={(item) => <List.Item>{item}</List.Item>}
                            />

                            <Title level={3}>Data Sharing</Title>
                            <Paragraph>
                                Company may share collected data with third-party service providers for the purpose of providing and improving services. Company will not sell, rent, or lease your personal information to third parties unless otherwise specified or required by law.
                            </Paragraph>

                            <Title level={3}>Data Security</Title>
                            <Paragraph>
                                Company implements appropriate technical and organizational measures to protect data from unauthorized access, disclosure, alteration, or destruction.
                            </Paragraph>

                            <Title level={3}>Your Rights</Title>
                            <Paragraph>
                                Customers have the right to:
                            </Paragraph>
                            <List

                                dataSource={[
                                    'Access and update their personal information.',
                                    'Request the deletion of their personal information.',
                                    'Opt-out of receiving promotional communications.',
                                ]}
                                renderItem={(item) => <List.Item>{item}</List.Item>}
                            />

                            <Title level={3}>Contact Us</Title>
                            <Paragraph>
                                If you have any questions or concerns about this Policy, please contact us at [Contact Information].
                            </Paragraph>




                            {/* </ProCard> */}
                            <ProFormCheckbox.Group
                                name="agreement"
                                label="Agreement"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                                options={['I have read and agree to the agreement']}
                            />

                        </StepsForm.StepForm>

                    </StepsForm>
                </ProCard>
            </PageContainer>
        </Watermark >

    );
}

export default Page