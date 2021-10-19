import React, { useEffect, useState } from "react";
import { Button, Input, Card, Divider } from "antd";
import {AddressInput} from './'
import { BufferList } from "bl";
    import { createLazyMint, generateTokenId, putLazyMint } from "../rarible/createLazyMint";
import { is } from "@babel/types";

const ipfsAPI = require('ipfs-http-client');
const ipfs = ipfsAPI({host: 'ipfs.infura.io', port: '5001', protocol: 'https' });

export default function LazyMint(props) {

  const titleMint = {
      fontFamily: "Whyte-Inktrap",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "35px",
      lineHeight: "100%",   
      letterSpacing: "-0.02em",
      textTransform: "uppercase",
      color: "#313439",
      marginBottom: "25px",
      textAlign: "center"
  }

  const active = {
    backgroundColor:"rgba(73, 70, 230, 1)",
    color: "white!important"

  }

  const createDesc = {
    fontSize: "20px",
    textTransform: "uppercase",
    fontWeight: "600",
    marginBottom: "20px"

  }

  const buttonMint = {
      width: "429px",
      height: "110px",
      textAlign: "center",
      marginTop: "20px",
      fontFamily: "Grtsk-Zetta",
      margin: "0 auto",
      fontSize: "14px",
      lineHeight: "17px",
      marginBottom: "50px",
      color: "white",
      alignItems: "center",
      letterSpacing: "0.02em",
      textTransform: "uppercase",
      background: "linear-gradient(87.79deg, #8794FF 5.12%, #3B50FF 99.11%)",
      borderRadius: "30px"
  }
      
  const nftDroparea = {
      width: "500px",
      height: "50px",
      margin: "0 auto",
      textAlign: "center",
      background: "#F0F1F9",
      borderRadius: "50px",
      marginBottom: "34px",
      fontFamily: "calibri",
      padding: "10px",
      overflow: "hidden",
      cursor: "pointer"
  }

  const nftDropareaDesc = {
      fontFamily: "Whyte",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "20px",
      lineHeight: "25px",
      textAlign: "center",
      letterSpacing: "0.02em",
      textTransform: "uppercase",
      color: "#313439",
      flex: "none",
      paddingTop: "10%"
  }
  const allowedFormats = {
      textAlign: "center",
      marginTop: "10%"
  }
  const format = {
      padding: "10px",
      width: "89px",
      height: "35px",
      marginRight: "20px",
      background: "#FFFFFF",
      borderRadius: "50px",
      fontFamily: "Grtsk-Zetta",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "14px",
      lineHeight: "15px",
      letterSpacing: "0.02em",
      textTransform: "uppercase",
      color: "#B2B2C1"
  }

  const nftInfo = {
      marginLeft: "28%"
  }
  const nftDesc = {
      width: "500px",
      height: "150px",
      border: "none",
      paddingLeft: "20px",
      paddingBottom: "45px",
      background: "#F0F1F9",
      borderRadius: "20px",
      marginBottom: "20PX",
      fontFamily: "Grtsk-Zetta",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "14px",
      lineHeight: "15px",
      letterSpacing: "0.02em",
      textTransform: "uppercase",
      color: "#4A4E52"
  }
  const nftCopies = {
    border: "none",
    width: "500px",
    height: "54px",
    background: "#F0F1F9",
    borderRadius: "20px",
    marginBottom: "20px",
    fontFamily: "Grtsk-Zetta",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "15px",
    letterSpacing: "0.02em",
    textTransform: "uppercase",
    color: "#4A4E52"
  }

  const nftName = {    
    border: "none",
    width: "500px",
    height: "54px",
    background: "#F0F1F9",
    borderRadius: "20px",
    marginBottom: "20px",
    fontFamily: "Grtsk-Zetta",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "15px",
    letterSpacing: "0.02em",
    textTransform: "uppercase",
    color: "#4A4E52"
  }

  const nftMintpatronage = {
      border: "none",
      width: "500px",
      paddingLeft: "20px",
      height: "125px",
      background: "#F0F1F9",
      borderRadius: "20px",
      marginBottom: "20px",
      fontFamily: "Grtsk-Zetta",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "14px",
      lineHeight: "15px",
      letterSpacing: "0.02em",
      textTransform: "uppercase",
      color: "#4A4E52"
  }

  const nftPricing = {
      textAlign: "center"
  }
  const collections = {
      marginTop: "5%",
      marginBottom: "163px",
      textAlign: "center"
  }
  const singleButtonChoose = {
    border: "none",
    padding: "21px",
    fontFamily: "Grtsk Zetta",
    margin: "10px",
    textTransform: "uppercase",
    fontSize: "14px",
    borderRadius: "21px"
  }
  const buttonsChoose = {
    marginTop: "50px",
    marginBottom:"50px"
  }



  const getFromIPFS = async hashToGet => {
    for await (const file of ipfs.get(hashToGet)) {

      // console.log(file.path);

      if (!file.content) continue;
      const content = new BufferList();
      for await (const chunk of file.content) {
        content.append(chunk);
      }
      // console.log(content);
      return content;
    }
  };
  

  const [erc721ContractAddress, setErc721ContractAddress] = React.useState();


  //single ERC721

  const [singleErc721IpfsHash, setSingleErc721IpfsHash] = React.useState();
  const [singleErc721File, setSingleErc721File] = React.useState();
  const [singleErc721Title, setSingleErc721Title] = React.useState();
  const [singleErc721Description, setSingleErc721Description] = React.useState();
  const [singleErc721Royalties, setSingleErc721Royalties] = React.useState();
  const [singleErc721Collection, setSingleErc721Collection] = React.useState();
  const [singleErc721TokenId, setSingleErc721TokenId] = React.useState();
  const [singleSending721, setSingleSending721] = React.useState();

  // multiple ERC721

  const [multipleErc721IpfsHash, setMultipleErc721IpfsHash] = React.useState();
  const [multipleErc721File, setMultipleErc721File] = React.useState();
  const [multipleErc721Title, setMultipleErc721Title] = React.useState();
  const [multipleErc721Description, setMultipleErc721Description] = React.useState();
  const [multipleErc721Royalties, setMultipleErc721Royalties] = React.useState();
  const [multipleErc721Collection, setMultipleErc721Collection] = React.useState();
  const [multipleErc721TokenId, setMultipleErc721TokenId] = React.useState();
  const [multipleErc721NumberCopies, setMultipleErc721NumberCopies] = React.useState();

  const [multipleSending721, setMultipleSending721] = React.useState();



  
  // const [erc1155IpfsHash, setErc1155IpfsHash] = React.useState();
  // const [erc1155TokenId, setErc1155TokenId] = React.useState();
  // const [sending1155, setSending1155] = React.useState();
  // const [erc1155ContractAddress, setErc1155ContractAddress] = React.useState();





  // console.log({writeContracts: props.writeContracts})


  const [singleNFT, setIsSingle] = useState(true)
  const [formData, setFormData] = useState()
  const [isMint, setIsMint] = useState(false)
  const [multipleNFT, setIsMultiple] = useState(false)

  const onChangeTypeSingle = () => {
        setIsSingle(true)
        setIsMultiple(false)
      
  };

  const onChangeTypeMultiple = () => {
      setIsSingle(false)
      setIsMultiple(true)
  };

  // on every render
  useEffect(()=>{
      console.log("on every render")
  })

  // on first render/mount
  useEffect(()=>{

    console.log("on first  render/ mount")

  },[])

  // on first render +  whenever dependency formData is updated
  useEffect(()=>{

      console.log("from use effect " + singleErc721File)

      console.log("minted use effect")
      console.log("form",formData)

  },[ formData])


   
  useEffect(()=>{

    console.log("from use effect " + singleErc721File)

    console.log("minted use effect")
    console.log("form",formData)
    
},[ formData])


  return (
    <div>
      <div style={buttonsChoose}>
          <button  style={singleButtonChoose} onClick={onChangeTypeSingle}>
               Single NFT
          </button>
          <button style={singleButtonChoose} onClick={onChangeTypeMultiple}>
             Multiple NFTs
          </button>
        </div>

    { singleNFT ? 
    <div>
      <div style={createDesc}>
        Create a single NFT
      </div>
        <Input
          placeholder=""
          type="file"
          style={nftDroparea}
           onChange={ e => {
             e.preventDefault();

            const file = e.target.files[0]

            setSingleErc721File(e.target.files[0])


          }}
        />
        <Input
          value={singleErc721Title}
          placeholder="Title"
          type="text"
          style={nftName}
          onChange={e => {
            setSingleErc721Title(e.target.value);
          }}
        />
        <Input
          value={singleErc721Description}
          placeholder="Description"
          style={nftDesc}
          onChange={e => {
            setSingleErc721Description(e.target.value);
          }}
        />
        <Input
          value={singleErc721Royalties}
          placeholder="Royalties"
          type="text"
          style={nftName}
          onChange={e => {
            setSingleErc721Royalties(e.target.value);
          }}
        />
  <br/>
    <div>Choose Collection</div>
      <label>
        <Input
          value={singleErc721Collection}
          placeholder=""
          type="checkbox"
          onChange={e => {
            setSingleErc721Collection(e.target.value);
          }}
        />
       Rarible
        </label>


          <br/>
        <Button
          style={buttonMint}
          loading={singleSending721}
          size="large"
          shape="round"
          type="primary"
          onClick={async () => {
            // send to IPFS

            // get ipfs hash back

            const reader = new window.FileReader()


            reader.readAsArrayBuffer(singleErc721File)
            // var pr;

            reader.onloadend = async () => {

              const buffer = Buffer(reader.result)
              
              const r = await ipfs.add(JSON.stringify(buffer))
              // pr =r.path
              setSingleErc721File(r.path)

              // const back  = await getFromIPFS(r.path)

            }


             const formData = {
              singleErc721File:  singleErc721File,
              singleErc721Title: singleErc721Title,
              singleErc721Description: singleErc721Description,
              singleErc721Royalties: singleErc721Royalties,
              singleErc721Collection: singleErc721Collection
            }

            setFormData(formData)
            const ipfsFinalTokenHash = await ipfs.add(JSON.stringify(formData))
            console.log( "ipfstokenhash" +  ipfsFinalTokenHash.path)


            // console.log("formdata" + formData)


            if (!props.writeContracts) return
            setSingleSending721(true);
            const newTokenId = await generateTokenId(props.writeContracts.ERC721Rarible.address, props.accountAddress)
            setSingleErc721TokenId(newTokenId)
            setErc721ContractAddress(props.writeContracts.ERC721Rarible.address)
            // console.log("sending");
            const form = await createLazyMint(newTokenId, props.provider, props.writeContracts.ERC721Rarible.address, props.accountAddress, singleErc721IpfsHash, 'ERC721')
            await putLazyMint(form)

            console.log(form) 
            setSingleSending721(false);
          }}
        >
          Mint
        </Button>

          {/* <Card title={
              <div>
                <span style={{ fontSize: 16, marginRight: 8 }}>Token ID: {erc721TokenId}</span>
              </div>
            } X>
            <div>
              <p>Contract: {erc721ContractAddress}</p>
            </div>
          </Card> */}


          <div>

          </div>

    </div>
    :
    <div>
      <div style={createDesc}>
        Create multiple NFTs
      </div>
      <Input
        value={multipleErc721File}
        placeholder=""
        type="file"
        style={nftDroparea}
        onChange={e => {
          setMultipleErc721File(e.target.value);
        }}
      />
      <Input
        value={multipleErc721Title}
        placeholder="Title"
        type="text"
        style={nftName}
        onChange={e => {
          setMultipleErc721Title(e.target.value);
        }}
      />
      <Input
        value={multipleErc721Description}
        placeholder="Description"
        style={nftDesc}
        onChange={e => {
          setMultipleErc721Description(e.target.value);
        }}
      />
      <Input
        value={multipleErc721Collection}
        placeholder="Choose collection"
        type="text"
        style={nftMintpatronage}
        onChange={e => {
          setMultipleErc721Collection(e.target.value);
        }}
      />
      <Input
          value={multipleErc721Royalties}
          placeholder="Royalties"
          type="text"
          style={nftName}
          onChange={e => {
            setMultipleErc721Royalties(e.target.value);
          }}
      />
      <Input
          value={multipleErc721NumberCopies}
          placeholder="Number of copies"
          type="text"
          style={nftName}
          onChange={e => {
            setMultipleErc721NumberCopies(e.target.value);
          }}
      />



        <br/>
        <Button
          style={buttonMint}
          loading={multipleSending721}
          size="large"
          shape="round"
          type="primary"
          onClick={async () => {
            if (!props.writeContracts) return
            setMultipleSending721(true);
            const newTokenId = await generateTokenId(props.writeContracts.ERC721Rarible.address, props.accountAddress)
            setMultipleErc721TokenId(newTokenId)
            setErc721ContractAddress(props.writeContracts.ERC721Rarible.address)
            const form = await createLazyMint(newTokenId, props.provider, props.writeContracts.ERC721Rarible.address, props.accountAddress, multipleErc721IpfsHash, 'ERC721')
            await putLazyMint(form)
            setMultipleSending721(false);
          }}
        >
          Mint
        </Button>

        {/* <Card

          title={
            <div>
              <span style={{ fontSize: 16, marginRight: 8 }}>Token ID: {singleErc721TokenId}</span>
            </div>
            } 
          >
          <div>
            <p>Contract: {erc721ContractAddress}</p>
          </div>
        </Card> */}

  </div>

  }

  </div>
    
  );
}
