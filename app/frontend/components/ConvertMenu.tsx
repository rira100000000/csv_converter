import React, { useState, useEffect } from 'react';
import AllConvertForm from './AllConvertForm';
import IndividualConvertForm from './IndividualConvertForm';
import axios from 'axios';
import type { ShippingInfo } from '../types.d.ts';

type SetshowUploadButton = (value: boolean) => void;
type SetshowConvertMenu = (value: boolean) => void;
type SetshowConvertSheet = (value: boolean) => void;
type setLines = (value: string[][]) => void;
type setShippingInfos = React.Dispatch<React.SetStateAction<ShippingInfo[]>>;

interface ConvertMenuProps {
  openSpreadSheet: () => void;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  setshowUploadButton: SetshowUploadButton;
  setshowConvertMenu: SetshowConvertMenu;
  setshowConvertSheet: SetshowConvertSheet;
  shippingInfos: ShippingInfo[];
  setShippingInfos: setShippingInfos;
  lines: Array<Array<string | boolean>>;
  setLines: setLines;
}

type Conversions = {
  [key: string]: string;
};

export default function ConvertMenu(props: ConvertMenuProps) {
  const [conversions, setConversions] = useState<Conversions>({});
  const [allConvertMenu, setAllConvertMenu] = useState(false);
  const [individualConvertMenu, setIndividualConvertMenu] = useState(false);

  useEffect(() => {
    axios
      .get('/conversions')
      .then((response) => {
        setConversions(response.data);
      })
      .catch((error) => {
        console.error('データの取得に失敗しました: ', error);
      });
  }, [allConvertMenu, individualConvertMenu]);

  const detailsOnClick = (clickTarget, setClickTarget, setAnotherTaget) => {
    console.log(clickTarget);
    setClickTarget(!clickTarget);
    setAnotherTaget(false);
  };

  return (
    <>
      <div className='relative text-center h-12'>
        <button
          className='absolute left-0 top-0 text-md px-4 py-2 leading-none text-slate-400 hover:underline m-1'
          onClick={() => {
            props.openSpreadSheet();
            props.setshowUploadButton(true);
            props.setshowConvertMenu(false);
          }}
        >
          注文一覧に戻る
        </button>
        <h1 className='left-1/2 top-0 text-xl font-bold m-3'>
          クリックポスト変換設定
        </h1>
      </div>
      <div className='m-3 flex justify-center'>
        <div>
          <p>
            全ての商品で同じ内容品を記入する場合は、『内容品を一括で設定する』フォームに記入してください。
          </p>
          <p>
            商品毎に内容品を変更したい場合は『内容品を個別に設定する』フォームに記入してください。
          </p>
        </div>
      </div>
      <div className='border border-slate-300 mx-auto mt-2 md:w-[50em] w-screen'>
        <details open={allConvertMenu}>
          <summary
            className='text-xl font-bold m-2 hover:cursor-pointer'
            onClick={(e) => {
              e.preventDefault();
              console.log(allConvertMenu);

              detailsOnClick(
                allConvertMenu,
                setAllConvertMenu,
                setIndividualConvertMenu
              );
            }}
          >
            内容品を一括で設定する
          </summary>
          <p className='text-md flex justify-center items-center'>
            クリックポストに表記する内容品を入力してください
          </p>
          <AllConvertForm
            content={props.content}
            setContent={props.setContent}
            setshowConvertMenu={props.setshowConvertMenu}
            setshowConvertSheet={props.setshowConvertSheet}
            setShippingInfos={props.setShippingInfos}
            lines={props.lines}
          />
        </details>
      </div>
      <div className='border border-slate-300 mx-auto mt-2 md:w-[50em] w-screen'>
        <details open={individualConvertMenu}>
          <summary
            className='text-xl font-bold m-2 hover:cursor-pointer'
            onClick={(e) => {
              e.preventDefault();
              detailsOnClick(
                individualConvertMenu,
                setIndividualConvertMenu,
                setAllConvertMenu
              );
            }}
          >
            内容品を個別に設定する
          </summary>
          <p className='text-md flex justify-center items-center'>
            クリックポストに表記する内容品を入力してください
          </p>
          <IndividualConvertForm
            lines={props.lines}
            conversions={conversions}
            setShippingInfos={props.setShippingInfos}
            setshowConvertMenu={props.setshowConvertMenu}
            setshowConvertSheet={props.setshowConvertSheet}
          />
        </details>
      </div>
    </>
  );
}
