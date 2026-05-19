import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Building2, CreditCard, Wallet, ArrowUpRight, 
  CheckCircle2, AlertCircle, Clock, Save, 
  ShieldCheck, ArrowRightLeft, Info, PieChart,
  Loader2
} from "lucide-react";
import Toast from '../../components/shared/Toast'; 
import api from "../../utils/api";

const Payments = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [toast, setToast] = useState(null);
  
  // Verification States
  const [banks, setBanks] = useState([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  // Track the initially loaded data so we don't aggressively re-verify
  const [initialBankData, setInitialBankData] = useState(null);

  const [formData, setFormData] = useState({
    bankCode: "",
    bankName: "",
    accountNumber: "",
    accountName: "",
  });

  const [passFeeToCustomer, setPassFeeToCustomer] = useState(false);
  const [vendorPlan, setVendorPlan] = useState("FREE");

  // Initial Fetch (Profile + Banks)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, banksRes] = await Promise.all([
          api.get('/vendors/profile'),
          api.get('/vendors/banks')
        ]);
        
        const { vendor } = profileRes.data;
        const rawBankList = banksRes.data.data || [];
        
        // Remove duplicate bank codes from Paystack's response
        const uniqueBanks = Array.from(
          new Map(rawBankList.map(bank => [bank.code, bank])).values()
        );
        
        setBanks(uniqueBanks);
        
        // Find matching bank code if vendor already has a saved bank name
        const savedBank = uniqueBanks.find(b => b.name === vendor.bankName);
        const fetchedBankCode = savedBank?.code || "";
        
        setFormData({
          bankCode: fetchedBankCode,
          bankName: vendor.bankName || "",
          accountNumber: vendor.accountNumber || "",
          accountName: vendor.accountName || "",
        });
        
        if (vendor.accountName) {
          setIsVerified(true);
          // Save these exact values to state to prevent re-verification on load
          setInitialBankData({ 
            accountNumber: vendor.accountNumber, 
            bankCode: fetchedBankCode 
          });
        }
        
        setVendorPlan(vendor.plan || "FREE");
      } catch (error) {
        console.error("Failed to load payment settings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Auto-Verify Effect
  useEffect(() => {
    const verifyAccount = async () => {
      // If the input perfectly matches the valid database data, DO NOTHING!
      if (
        initialBankData && 
        formData.accountNumber === initialBankData.accountNumber && 
        formData.bankCode === initialBankData.bankCode
      ) {
        return; 
      }

      if (formData.accountNumber.length === 10 && formData.bankCode) {
        setIsVerifying(true);
        setVerifyError("");
        setIsVerified(false);
        setFormData(prev => ({ ...prev, accountName: "" }));

        try {
          const res = await api.get(`/vendors/verify-account?account_number=${formData.accountNumber}&bank_code=${formData.bankCode}`);
          
          if (res.data.status) {
            setFormData(prev => ({ ...prev, accountName: res.data.data.account_name }));
            setIsVerified(true);
          }
        } catch (err) {
          setVerifyError("Account not found. Please check the number and bank.");
        } finally {
          setIsVerifying(false);
        }
      } else {
        setIsVerified(false);
        setFormData(prev => ({ ...prev, accountName: "" }));
      }
    };

    // Debounce to prevent firing on every keystroke
    const timeoutId = setTimeout(() => {
      verifyAccount();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [formData.accountNumber, formData.bankCode, initialBankData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "bankCode") {
      const selectedBank = banks.find(b => b.code === value);
      setFormData(prev => ({ 
        ...prev, 
        bankCode: value,
        bankName: selectedBank ? selectedBank.name : "" 
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSaveBankDetails = async (e) => {
    e.preventDefault();
    if (!isVerified) return;

    setIsSaving(true);
    setSuccessMessage("");
    
    try {
      const submitData = new FormData();
      submitData.append("bankCode", formData.bankCode);
      submitData.append("bankName", formData.bankName);
      submitData.append("accountNumber", formData.accountNumber);
      submitData.append("accountName", formData.accountName);

      await api.put('/vendors/settings', submitData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setSuccessMessage("Bank details securely updated and linked for automated payouts.");
      setToast({ message: "Bank details saved successfully.", type: "success" });
      
      // Update our initial tracking data so it doesn't re-verify after saving
      setInitialBankData({
        accountNumber: formData.accountNumber,
        bankCode: formData.bankCode
      });

      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (error) {
      console.error("Failed to save bank details:", error);
      setToast({ message: "Failed to save bank details. Please try again.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const payouts = [
    { id: "PO-1092", amount: 45000, date: "May 11, 2026", status: "Successful", bank: "GTBank ****8912" },
    { id: "PO-1088", amount: 12500, date: "May 08, 2026", status: "Successful", bank: "GTBank ****8912" },
    { id: "PO-1085", amount: 89000, date: "May 02, 2026", status: "Successful", bank: "GTBank ****8912" },
  ];

  const getFeeDetails = () => {
    switch(vendorPlan) {
      case "GROWTH": return { sabi: "0%", total: "1.5% + ₦100" };
      case "STARTER": return { sabi: "1.5%", total: "3% + ₦100" };
      default: return { sabi: "3%", total: "4.5% + ₦100" };
    }
  };
  const fees = getFeeDetails();

  if (isLoading) return (
    <div className="flex-1 flex items-center justify-center bg-gray-50"><div className="w-8 h-8 border-4 border-sabi-primary border-t-transparent rounded-full animate-spin"></div></div>
  );

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 lg:pb-12 w-full bg-[#FAF9F5]">
        {toast && (
                <Toast 
                  message={toast.message} 
                  type={toast.type} 
                  onClose={() => setToast(null)} 
                />
              )}
      <div className="max-w-7xl mx-auto space-y-6">

        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-gray-900">Payments & Payouts</h1>
          <p className="text-sm font-medium text-gray-500 mt-1">Manage your receiving bank account and transaction fees.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#044e3b] rounded-3xl p-6 shadow-sm relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-bl-full"></div>
            <Wallet className="w-6 h-6 text-emerald-200 mb-4" />
            <p className="text-emerald-100 text-sm font-medium mb-1">Available for Next Payout</p>
            <h2 className="text-3xl font-black">₦14,500</h2>
            <p className="text-xs text-emerald-200 mt-4 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Settles automatically tomorrow morning
            </p>
          </div>
          
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            <ArrowUpRight className="w-6 h-6 text-gray-400 mb-4" />
            <p className="text-gray-500 text-sm font-medium mb-1">Total Lifetime Earnings</p>
            <h2 className="text-3xl font-black text-gray-900">₦146,500</h2>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6 shadow-sm">
            <ShieldCheck className="w-6 h-6 text-blue-600 mb-4" />
            <p className="text-blue-800 text-sm font-bold mb-1">Current Plan: {vendorPlan}</p>
            <div className="space-y-1 mt-3">
              <div className="flex justify-between text-sm">
                <span className="text-blue-600">SabiSell Fee:</span>
                <span className="font-bold text-blue-900">{fees.sabi}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-blue-600">Total Transaction Fee:</span>
                <span className="font-bold text-blue-900">{fees.total}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
          
          <div className="lg:col-span-7 space-y-6">
            
            <form onSubmit={handleSaveBankDetails} className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-700">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Receiving Bank Account</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Where should we send your sales money?</p>
                </div>
              </div>

              {successMessage && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-start gap-3">
                   <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                   <p className="text-sm font-bold text-emerald-800">{successMessage}</p>
                </div>
              )}

              <div className="space-y-4">
                <div className="relative">
                  <label className="absolute top-2 left-4 text-[10px] font-bold text-gray-400 uppercase z-10">Bank Name</label>
                  <select 
                    name="bankCode" 
                    value={formData.bankCode} 
                    onChange={handleChange}
                    required
                    className="w-full px-4 pt-6 pb-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sabi-primary/20 transition-all font-bold text-gray-900 appearance-none relative"
                  >
                    <option value="" disabled>Choose a bank...</option>
                    {banks.map(bank => (
                      <option key={bank.code} value={bank.code}>{bank.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="absolute top-2 left-4 text-[10px] font-bold text-gray-400 uppercase">Account Number</label>
                    <input 
                      type="text" 
                      name="accountNumber" 
                      required 
                      value={formData.accountNumber} 
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        setFormData({ ...formData, accountNumber: val });
                      }}
                      maxLength="10" 
                      placeholder="0123456789"
                      className="w-full px-4 pt-6 pb-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sabi-primary/20 transition-all font-bold text-gray-900 tracking-wider"
                    />
                  </div>
                  
                  <div className="relative">
                    <label className="absolute top-2 left-4 text-[10px] font-bold text-gray-400 uppercase">Account Name</label>
                    <div className="w-full px-4 pt-6 pb-2 bg-gray-50 border border-gray-200 rounded-xl h-[3.5rem] flex items-center">
                      {isVerifying ? (
                        <div className="flex items-center gap-2 text-gray-400 font-medium text-sm">
                          <Loader2 className="w-4 h-4 animate-spin" /> Verifying...
                        </div>
                      ) : formData.accountName ? (
                        <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm truncate">
                          <CheckCircle2 className="w-4 h-4 shrink-0" /> {formData.accountName}
                        </div>
                      ) : (
                        <span className="text-gray-400 font-medium text-sm">Awaiting verification...</span>
                      )}
                    </div>
                  </div>
                </div>

                {verifyError && (
                  <p className="text-xs font-bold text-red-500 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {verifyError}
                  </p>
                )}
              </div>

              <div className="mt-6 flex items-center justify-between pt-6 border-t border-gray-100">
                <p className="text-xs text-gray-500 max-w-[250px]">
                  By updating this, SabiSell will automatically route your funds to this account within 24 hours of a successful sale.
                </p>
                <button 
                  type="submit" 
                  disabled={isSaving || !isVerified}
                  className="px-3 sm:px-6 py-2.5 min-w-28 bg-[#044e3b] text-white rounded-xl font-bold text-sm hover:bg-[#033d2e] transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
                >
                  {isSaving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Save className="w-4 h-4" />}
                  {isSaving ? "Saving..." : "Save Details"}
                </button>
              </div>
            </form>

            <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    Pass Fees to Customer <span className="bg-blue-100 text-blue-800 text-[10px] px-2 py-0.5 rounded uppercase tracking-wider font-extrabold">New</span>
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 max-w-md leading-relaxed">
                    If enabled, the {fees.total} transaction fee will be added to the customer's checkout total, meaning you receive exactly your product's listed price.
                  </p>
                </div>
                
                <button 
                  type="button"
                  onClick={() => setPassFeeToCustomer(!passFeeToCustomer)}
                  className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${passFeeToCustomer ? 'bg-[#044e3b]' : 'bg-gray-200'}`}
                >
                  <span className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${passFeeToCustomer ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
              
              {passFeeToCustomer && (
                <div className="mt-4 p-3 bg-gray-50 rounded-xl flex gap-2 text-sm border border-gray-100">
                  <Info className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                  <p className="text-gray-600">A ₦10,000 product will now display as <strong>~₦10,550</strong> at checkout to cover gateway and platform fees.</p>
                </div>
              )}
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-100 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700">
                  <PieChart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Understanding Your Fees</h3>
                  <p className="text-xs text-gray-500 mt-0.5">How your transaction fees are calculated</p>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Every transaction includes a standard payment gateway fee charged by <strong>Paystack (1.5% + ₦100)</strong>, plus a small SabiSell platform fee based on your current plan. Upgrade your plan to keep more of your money!
              </p>

              <div className="space-y-3">
                <div className={`p-4 rounded-2xl border ${vendorPlan === 'FREE' ? 'bg-white border-blue-200 shadow-sm ring-1 ring-blue-100' : 'bg-white/60 border-transparent'}`}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-gray-900 flex items-center gap-2">
                      Free Plan {vendorPlan === 'FREE' && <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full uppercase tracking-wider">Current</span>}
                    </span>
                    <span className="font-black text-gray-900">3% <span className="text-xs text-gray-500 font-medium">Platform Fee</span></span>
                  </div>
                  <p className="text-xs text-gray-500">Total deduction per sale: 4.5% + ₦100</p>
                </div>

                <div className={`p-4 rounded-2xl border ${vendorPlan === 'STARTER' ? 'bg-white border-blue-200 shadow-sm ring-1 ring-blue-100' : 'bg-white/60 border-transparent'}`}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-gray-900 flex items-center gap-2">
                      Starter Plan {vendorPlan === 'STARTER' && <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full uppercase tracking-wider">Current</span>}
                    </span>
                    <span className="font-black text-gray-900">1.5% <span className="text-xs text-gray-500 font-medium">Platform Fee</span></span>
                  </div>
                  <p className="text-xs text-gray-500">Total deduction per sale: 3% + ₦100</p>
                </div>

                <div className={`p-4 rounded-2xl border ${vendorPlan === 'GROWTH' ? 'bg-white border-blue-200 shadow-sm ring-1 ring-blue-100' : 'bg-gradient-to-r from-emerald-50 to-emerald-100/50 border-emerald-200 shadow-sm'}`}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-emerald-900 flex items-center gap-2">
                      Growth Plan {vendorPlan === 'GROWTH' ? <span className="text-[10px] bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded-full uppercase tracking-wider">Current</span> : <span className="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wider font-extrabold shadow-sm">Best Value</span>}
                    </span>
                    <span className="font-black text-emerald-900">0% <span className="text-xs text-emerald-700 font-medium">Platform Fee</span></span>
                  </div>
                  <p className="text-xs text-emerald-700">Total deduction per sale: 1.5% + ₦100 (Paystack only)</p>
                </div>
              </div>
              
              {vendorPlan !== 'GROWTH' && (
                <div className="mt-6">
                  <Link to="/dashboard/billing" className="w-full py-3 bg-white border border-gray-200 text-gray-900 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-sm">
                    Upgrade Plan to Reduce Fees <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>

          </div>

          <div className="lg:col-span-5">
            <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden h-full flex flex-col">
              
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-bold text-gray-900">Recent Payouts</h3>
                <button className="text-xs font-bold text-[#044e3b] hover:underline">View All</button>
              </div>

              <div className="flex-1 p-6">
                {formData.accountNumber === "" ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-10">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                      <ArrowRightLeft className="w-6 h-6 text-gray-300" />
                    </div>
                    <p className="text-sm font-bold text-gray-900 mb-1">No bank details added</p>
                    <p className="text-xs text-gray-500 max-w-[200px]">Add your bank details on the left to start receiving automated payouts.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {payouts.map((payout) => (
                      <div key={payout.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center shrink-0">
                            <ArrowUpRight className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 text-sm">₦{payout.amount.toLocaleString()}</p>
                            <p className="text-xs text-gray-500 font-medium">{payout.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                            <CheckCircle2 className="w-3 h-3" /> {payout.status}
                          </span>
                          <p className="text-[10px] text-gray-400 mt-1 truncate max-w-[80px]">{payout.bank}</p>
                        </div>
                      </div>
                    ))}
                    
                    <div className="pt-6 mt-6 border-t border-gray-100 text-center">
                      <p className="text-xs text-gray-400 font-medium flex items-center justify-center gap-1.5">
                        <ShieldCheck className="w-4 h-4" /> Payouts securely processed by Paystack
                      </p>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Payments;