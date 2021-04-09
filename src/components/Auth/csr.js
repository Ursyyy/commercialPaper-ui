import { KEYUTIL, KJUR } from 'jsrsasign'

const getCSR = userData => {
    const kp = KEYUTIL.generateKeypair('EC', 'secp256r1')
    const privateHex = kp.prvKeyObj.prvKeyHex

    // const privateKeyPem = KEYUTIL.getPEM(kp.prvKeyObj, 'PKCS8PRV')
    // const publicKeyPem = KEYUTIL.getPEM(kp.pubKeyObj, 'PKCS8PUB')
    // const {name, org} = userData
    // const host = org == 'org1' ? '204d3b0e107c' : 'a529b15d5e64'
    // // /CN=USERNAME/C=COUNTRY/ST=STATE/O=HYPERLEDGER/OU=FABRIC/L=CITY
    // const csrPem = KJUR.asn1.csr.CSRUtil.newCSRPEM({
    //     subject: {str: `/OU=client+OU=${org}+OU=department1/CN=${name}`},//`/CN=${name}/C=${country}/ST=${state}/O=${company}/OU=${companyou}+OU=client+OU=${org}+OU=department1`},
    //     ext: [
    //         {subjectAltName: {array: [{dns: 'localhost'}, {dns: host}]}}
    //     ],
    //     sbjpubkey: publicKeyPem,
    //     sigalg: 'SHA256withECDSA',
    //     sbjprvkey: privateKeyPem,
    // })
    return {privateHex}
}


export default getCSR