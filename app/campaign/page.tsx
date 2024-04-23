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
import { Watermark, message, Avatar, Space, Result, Button } from 'antd';
import { useEffect, useRef, useState } from 'react';
import liff from '@line/liff';
import { LoadingOutlined } from '@ant-design/icons';

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
                extra={<Space><Avatar shape="square" size={50} src={init?.pictureUrl} />
                    <Button onClick={signOutApp} type='primary' danger>Sign Out</Button></Space>
                }
            >
                <ProCard>
                    <StepsForm<{
                        name: string;
                    }>
                        formRef={formRef}
                        onFinish={async () => {
                            await waitTime(1000);
                            message.success('提交成功');
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
                                name="name"
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
                                rules={[{ required: true }]}
                            />

                            <ProFormText
                                name="lastName"
                                label="Last Name"
                                width="md"
                                tooltip="your last name"
                                placeholder="Please enter your last name"
                                rules={[{ required: true }]}
                            />

                            <ProFormText
                                name="email"
                                label="Email"
                                width="md"
                                tooltip="your email"
                                placeholder="Please enter your email"
                                rules={[{ required: true }]}
                            />

                            <ProFormSelect
                                name="industry"
                                label="Industry"
                                width="md"
                                tooltip="your industry"
                                placeholder="Please enter your industry"
                                rules={[{ required: true }]}
                                options={[
                                    {
                                        value: 'china',
                                        label: 'China',
                                    },
                                    {
                                        value: 'usa',
                                        label: 'USA',
                                    },
                                ]}
                            />


                            <ProFormSelect
                                name="country"
                                label="Country"
                                width="md"
                                tooltip="your industry"
                                placeholder="Please enter your country"
                                rules={[{ required: true }]}
                                options={[
                                    {
                                        value: 'china',
                                        label: 'China',
                                    },
                                    {
                                        value: 'usa',
                                        label: 'USA',
                                    },
                                ]}
                            />


                        </StepsForm.StepForm>
                        <StepsForm.StepForm<{
                            checkbox: string;
                        }>
                            name="checkbox"
                            title="Analytical Information"
                            stepProps={{
                                description: 'which type of analysis you want to do?',
                            }}
                            onFinish={async () => {
                                console.log(formRef.current?.getFieldsValue());
                                return true;
                            }}
                        >
                            <ProFormCheckbox.Group
                                name="checkbox"
                                label="Analytical Chemistry Type"
                                width="md"
                                options={['Analytical Chemistry- Analytical Chemistry- Electrophoresis',
                                    'Analytical Chemistry- HPLC', 'Analytical Chemistry- Resins and Media',
                                    'Analytical Chemistry- Standards', 'Analytical Chemistry- NMR', 'Analytical Chemistry- GC',
                                    'Life Science- Biochemicals', 'Life Science- Glycoscience', 'Life Science- Molecular Biology',

                                ]}

                            />

                            <ProFormCheckbox.Group
                                name="chemical"
                                label="Chemistry Type"
                                width="md"
                                options={['Chemistry- Asymmetric Synthesis', 'Chemistry- Chemical Biology', 'Chemistry- Drug Discovery Research Reagents',
                                    'Chemistry- Solvents', 'Chemistry- Synthetic Reagents', 'Chemistry- Organometallic Reagents', 'Chemistry- Building Blocks',
                                    'Chemistry- Catalysis and Inorganic Chemistry',
                                ]}

                            />

                            {/* Life Science */}
                            <ProFormCheckbox.Group
                                name="lifeScience"
                                label="Life Science Type"
                                width="md"
                                options={['Life Science- Biochemicals', 'Life Science- Glycoscience', 'Life Science- Molecular Biology'

                                ]}

                            />

                            {/* Materials Science */}
                            <ProFormCheckbox.Group
                                name="materialsScience"
                                label="Materials Science Type"
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
                            <ProFormCheckbox.Group
                                name="checkbox"
                                label="部署单元"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                                options={['部署单元1', '部署单元2', '部署单元3']}
                            />
                            <ProFormSelect
                                label="部署分组策略"
                                name="remark"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                                initialValue="1"
                                options={[
                                    {
                                        value: '1',
                                        label: '策略一',
                                    },
                                    { value: '2', label: '策略二' },
                                ]}
                            />
                            <ProFormSelect
                                label="Pod 调度策略"
                                name="remark2"
                                initialValue="2"
                                options={[
                                    {
                                        value: '1',
                                        label: '策略一',
                                    },
                                    { value: '2', label: '策略二' },
                                ]}
                            />
                        </StepsForm.StepForm>
                    </StepsForm>
                </ProCard>
            </PageContainer>
        </Watermark>

    );
}

export default Page